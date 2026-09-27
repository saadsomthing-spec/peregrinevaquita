/* ============================================================
   ADMIN-FUNCTION/functionset3.js

   YOUTUBE MUSIC COMMANDS
============================================================ */


let youtubePlayer =
    null;


let youtubeApiPromise =
    null;


/* ============================================================
   LOAD YOUTUBE API
============================================================ */

function loadYouTubeApi() {

    if (
        window.YT &&
        window.YT.Player
    ) {

        return Promise.resolve();

    }


    if (
        youtubeApiPromise
    ) {

        return youtubeApiPromise;

    }


    youtubeApiPromise =
        new Promise(

            function(resolve) {

                const oldCallback =
                    window.onYouTubeIframeAPIReady;


                window.onYouTubeIframeAPIReady =
                    function() {


                        if (
                            typeof oldCallback ===
                            "function"
                        ) {

                            oldCallback();

                        }


                        resolve();

                    };


                const existing =
                    document.querySelector(
                        'script[src="https://www.youtube.com/iframe_api"]'
                    );


                if (
                    !existing
                ) {

                    const script =
                        document.createElement(
                            "script"
                        );


                    script.src =
                        "https://www.youtube.com/iframe_api";


                    document.head.appendChild(
                        script
                    );

                }

            }

        );


    return youtubeApiPromise;

}


/* ============================================================
   CREATE PLAYER CONTAINER
============================================================ */

function getPlayerContainer() {

    let container =
        document.getElementById(
            "admin-youtube-player"
        );


    if (
        container
    ) {

        return container;

    }


    container =
        document.createElement(
            "div"
        );


    container.id =
        "admin-youtube-player";


    Object.assign(

        container.style,

        {

            position:
                "fixed",

            right:
                "12px",

            bottom:
                "12px",

            width:
                "220px",

            height:
                "124px",

            zIndex:
                "9000",

            borderRadius:
                "12px",

            overflow:
                "hidden",

            boxShadow:
                "0 8px 30px rgba(0,0,0,.25)"

        }

    );


    document.body.appendChild(
        container
    );


    return container;

}


/* ============================================================
   EXTRACT VIDEO ID
============================================================ */

function getYouTubeVideoId(
    value
) {

    if (
        !value
    ) {

        return null;

    }


    const trimmed =
        value.trim();


    /*
        Direct video ID
    */

    if (
        /^[a-zA-Z0-9_-]{11}$/.test(
            trimmed
        )
    ) {

        return trimmed;

    }


    try {

        const url =
            new URL(
                trimmed
            );


        /*
            youtube.com/watch?v=XXXX
        */

        const watchId =
            url.searchParams.get(
                "v"
            );


        if (
            watchId
        ) {

            return watchId;

        }


        /*
            youtu.be/XXXX
        */

        if (
            url.hostname.includes(
                "youtu.be"
            )
        ) {

            return url.pathname
                .replace(
                    "/",
                    ""
                )
                .split(
                    "/"
                )[0];

        }


        /*
            youtube.com/embed/XXXX
        */

        const parts =
            url.pathname
                .split(
                    "/"
                )
                .filter(
                    Boolean
                );


        const embedIndex =
            parts.indexOf(
                "embed"
            );


        if (
            embedIndex !== -1 &&
            parts[
                embedIndex + 1
            ]
        ) {

            return parts[
                embedIndex + 1
            ];

        }

    }

    catch (error) {

        console.warn(
            "Invalid YouTube URL:",
            error
        );

    }


    return null;

}


/* ============================================================
   START / CHANGE VIDEO
============================================================ */

async function playYouTubeVideo(
    videoId
) {

    await loadYouTubeApi();


    getPlayerContainer();


    if (
        youtubePlayer
    ) {

        youtubePlayer.loadVideoById(
            videoId
        );


        youtubePlayer.playVideo();


        return;

    }


    youtubePlayer =
        new window.YT.Player(

            "admin-youtube-player",

            {

                width:
                    "220",

                height:
                    "124",

                videoId:
                    videoId,

                playerVars: {

                    autoplay:
                        1,

                    controls:
                        1,

                    playsinline:
                        1

                },

                events: {

                    onReady:
                        function(event) {

                            event.target.playVideo();

                        },

                    onAutoplayBlocked:
                        function() {

                            console.warn(
                                "Browser blocked YouTube autoplay until user interaction."
                            );

                        }

                }

            }

        );

}


/* ============================================================
   COMMANDS
============================================================ */

export const commands = [


    /* ========================================================
       PLAY YOUTUBE

       VALUE:
       YouTube URL OR video ID
    ======================================================== */

    {

        name:
            "youtube-play",


        async run({
            value,
            broadcast,
            output
        }) {

            const videoId =
                getYouTubeVideoId(
                    value
                );


            if (
                !videoId
            ) {

                output(
                    "Paste a YouTube URL or video ID in Value."
                );


                return;

            }


            await broadcast(

                "youtube-play",

                {

                    videoId:
                        videoId

                }

            );


            output(
                "▶️ YouTube music sent to everyone."
            );

        },


        async receive({
            data
        }) {

            if (
                !data?.videoId
            ) {

                return;

            }


            await playYouTubeVideo(
                data.videoId
            );

        }

    },


    /* ========================================================
       PAUSE
    ======================================================== */

    {

        name:
            "youtube-pause",


        async run({
            broadcast,
            output
        }) {

            await broadcast(
                "youtube-pause"
            );


            output(
                "⏸ YouTube paused for everyone."
            );

        },


        async receive() {

            if (
                youtubePlayer &&
                youtubePlayer.pauseVideo
            ) {

                youtubePlayer.pauseVideo();

            }

        }

    },


    /* ========================================================
       RESUME
    ======================================================== */

    {

        name:
            "youtube-resume",


        async run({
            broadcast,
            output
        }) {

            await broadcast(
                "youtube-resume"
            );


            output(
                "▶️ YouTube resumed."
            );

        },


        async receive() {

            if (
                youtubePlayer &&
                youtubePlayer.playVideo
            ) {

                youtubePlayer.playVideo();

            }

        }

    },


    /* ========================================================
       STOP
    ======================================================== */

    {

        name:
            "youtube-stop",


        async run({
            broadcast,
            output
        }) {

            await broadcast(
                "youtube-stop"
            );


            output(
                "⏹ YouTube stopped."
            );

        },


        async receive() {

            if (
                youtubePlayer &&
                youtubePlayer.stopVideo
            ) {

                youtubePlayer.stopVideo();

            }


            const container =
                document.getElementById(
                    "admin-youtube-player"
                );


            if (
                container
            ) {

                container.remove();

            }


            youtubePlayer =
                null;

        }

    },


    /* ========================================================
       VOLUME

       VALUE:
       0 - 100
    ======================================================== */

    {

        name:
            "youtube-volume",


        async run({
            value,
            broadcast,
            output
        }) {

            let volume =
                Number(
                    value
                );


            if (
                Number.isNaN(
                    volume
                )
            ) {

                output(
                    "Value must be from 0 to 100."
                );


                return;

            }


            volume =
                Math.max(
                    0,
                    Math.min(
                        100,
                        volume
                    )
                );


            await broadcast(

                "youtube-volume",

                {

                    volume:
                        volume

                }

            );


            output(
                `🔊 Volume set to ${volume}.`
            );

        },


        async receive({
            data
        }) {

            if (
                !youtubePlayer ||
                !youtubePlayer.setVolume
            ) {

                return;

            }


            youtubePlayer.setVolume(
                Number(
                    data?.volume ??
                    100
                )
            );

        }

    }

];
