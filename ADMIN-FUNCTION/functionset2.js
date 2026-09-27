/* ============================================================
   ADMIN-FUNCTION/functionset2.js

   20 UNIVERSAL ADMIN COMMANDS
============================================================ */


/* ============================================================
   HELPERS
============================================================ */

function getMessagesArray(
    getMessages
) {

    return Array.from(
        getMessages()
    );

}


async function sendUniversal(
    broadcast,
    output,
    commandName,
    message,
    data = {}
) {

    await broadcast(
        commandName,
        data
    );

    output(
        message
    );

}


function removeElementById(
    id
) {

    const element =
        document.getElementById(
            id
        );

    if (element) {

        element.remove();

    }

}


function createOverlay(
    id,
    zIndex = "999998"
) {

    removeElementById(
        id
    );


    const overlay =
        document.createElement(
            "div"
        );


    overlay.id =
        id;


    Object.assign(

        overlay.style,

        {

            position:
                "fixed",

            inset:
                "0",

            overflow:
                "hidden",

            pointerEvents:
                "none",

            zIndex:
                zIndex

        }

    );


    document.body.appendChild(
        overlay
    );


    return overlay;

}


/* ============================================================
   COMMANDS
============================================================ */

export const commands = [


    /* ========================================================
       1. SNOW
    ======================================================== */

    {

        name:
            "snow",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "snow",

                "❄️ Snowstorm sent to everyone."

            );

        },


        async receive() {

            const layer =
                createOverlay(
                    "admin-snow-layer"
                );


            for (
                let i = 0;
                i < 100;
                i++
            ) {

                const snowflake =
                    document.createElement(
                        "div"
                    );


                snowflake.textContent =
                    "❄";


                Object.assign(

                    snowflake.style,

                    {

                        position:
                            "absolute",

                        top:
                            "-40px",

                        left:
                            Math.random() *
                                100 +
                            "vw",

                        fontSize:
                            (
                                10 +
                                Math.random() *
                                24
                            ) +
                            "px",

                        opacity:
                            (
                                0.4 +
                                Math.random() *
                                0.6
                            ).toString()

                    }

                );


                layer.appendChild(
                    snowflake
                );


                snowflake.animate(

                    [

                        {

                            transform:
                                "translate(0,0) rotate(0deg)"

                        },

                        {

                            transform:
                                `translate(${Math.random() * 160 - 80}px,110vh) rotate(${Math.random() * 500}deg)`

                        }

                    ],

                    {

                        duration:
                            3500 +
                            Math.random() *
                            4000,

                        iterations:
                            2,

                        easing:
                            "linear"

                    }

                );

            }


            setTimeout(

                function() {

                    layer.remove();

                },

                9000

            );

        }

    },


    /* ========================================================
       2. EMOJI RAIN
    ======================================================== */

    {

        name:
            "emoji-rain",


        async run({
            broadcast,
            output,
            value
        }) {

            const emoji =
                value || "😂";


            await sendUniversal(

                broadcast,

                output,

                "emoji-rain",

                `Emoji rain sent: ${emoji}`,

                {
                    emoji:
                        emoji
                }

            );

        },


        async receive({
            data
        }) {

            const emoji =
                data?.emoji ||
                "😂";


            const layer =
                createOverlay(
                    "admin-emoji-rain"
                );


            for (
                let i = 0;
                i < 80;
                i++
            ) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.textContent =
                    emoji;


                Object.assign(

                    item.style,

                    {

                        position:
                            "absolute",

                        top:
                            "-50px",

                        left:
                            Math.random() *
                                100 +
                            "vw",

                        fontSize:
                            (
                                18 +
                                Math.random() *
                                32
                            ) +
                            "px"

                    }

                );


                layer.appendChild(
                    item
                );


                item.animate(

                    [

                        {

                            transform:
                                "translateY(0) rotate(0deg)"

                        },

                        {

                            transform:
                                `translateY(110vh) rotate(${Math.random() * 720}deg)`

                        }

                    ],

                    {

                        duration:
                            1800 +
                            Math.random() *
                            3000,

                        easing:
                            "linear"

                    }

                );

            }


            setTimeout(

                function() {

                    layer.remove();

                },

                5500

            );

        }

    },


    /* ========================================================
       3. FIREWORKS
    ======================================================== */

    {

        name:
            "fireworks",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "fireworks",

                "🎆 Fireworks launched."

            );

        },


        async receive() {

            const layer =
                createOverlay(
                    "admin-fireworks-layer"
                );


            const colors = [

                "#ff4757",
                "#ffa502",
                "#2ed573",
                "#1e90ff",
                "#eccc68",
                "#a55eea"

            ];


            for (
                let burst = 0;
                burst < 8;
                burst++
            ) {

                setTimeout(

                    function() {

                        const centerX =
                            10 +
                            Math.random() *
                            80;


                        const centerY =
                            10 +
                            Math.random() *
                            60;


                        for (
                            let i = 0;
                            i < 35;
                            i++
                        ) {

                            const particle =
                                document.createElement(
                                    "div"
                                );


                            const angle =
                                (
                                    Math.PI *
                                    2 *
                                    i
                                ) /
                                35;


                            const distance =
                                60 +
                                Math.random() *
                                130;


                            Object.assign(

                                particle.style,

                                {

                                    position:
                                        "absolute",

                                    left:
                                        centerX +
                                        "vw",

                                    top:
                                        centerY +
                                        "vh",

                                    width:
                                        "5px",

                                    height:
                                        "5px",

                                    borderRadius:
                                        "50%",

                                    background:
                                        colors[
                                            Math.floor(
                                                Math.random() *
                                                colors.length
                                            )
                                        ]

                                }

                            );


                            layer.appendChild(
                                particle
                            );


                            particle.animate(

                                [

                                    {

                                        transform:
                                            "translate(0,0) scale(1)",

                                        opacity:
                                            1

                                    },

                                    {

                                        transform:
                                            `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,

                                        opacity:
                                            0

                                    }

                                ],

                                {

                                    duration:
                                        800 +
                                        Math.random() *
                                        700,

                                    easing:
                                        "ease-out",

                                    fill:
                                        "forwards"

                                }

                            );

                        }

                    },

                    burst *
                    500

                );

            }


            setTimeout(

                function() {

                    layer.remove();

                },

                5500

            );

        }

    },


    /* ========================================================
       4. MATRIX RAIN
    ======================================================== */

    {

        name:
            "matrix-rain",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "matrix-rain",

                "💻 Matrix mode activated."

            );

        },


        async receive() {

            const layer =
                createOverlay(
                    "admin-matrix-layer"
                );


            layer.style.background =
                "rgba(0,0,0,0.88)";


            const characters =
                "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";


            for (
                let column = 0;
                column < 45;
                column++
            ) {

                const stream =
                    document.createElement(
                        "div"
                    );


                let text =
                    "";


                for (
                    let i = 0;
                    i < 30;
                    i++
                ) {

                    text +=
                        characters[
                            Math.floor(
                                Math.random() *
                                characters.length
                            )
                        ] +
                        "\n";

                }


                stream.textContent =
                    text;


                Object.assign(

                    stream.style,

                    {

                        whiteSpace:
                            "pre",

                        position:
                            "absolute",

                        left:
                            (
                                column *
                                2.3
                            ) +
                            "vw",

                        top:
                            "-100vh",

                        color:
                            "#00ff66",

                        fontFamily:
                            "monospace",

                        fontSize:
                            "14px",

                        lineHeight:
                            "16px"

                    }

                );


                layer.appendChild(
                    stream
                );


                stream.animate(

                    [

                        {
                            transform:
                                "translateY(0)"
                        },

                        {
                            transform:
                                "translateY(220vh)"
                        }

                    ],

                    {

                        duration:
                            3000 +
                            Math.random() *
                            4000,

                        iterations:
                            2,

                        easing:
                            "linear"

                    }

                );

            }


            setTimeout(

                function() {

                    layer.remove();

                },

                9000

            );

        }

    },


    /* ========================================================
       5. SPIN MESSAGES
    ======================================================== */

    {

        name:
            "spin-messages",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "spin-messages",

                "🌀 Messages spinning."

            );

        },


        async receive({
            getMessages
        }) {

            getMessagesArray(
                getMessages
            ).forEach(

                function(element) {

                    element.animate(

                        [

                            {
                                transform:
                                    "rotate(0deg)"
                            },

                            {
                                transform:
                                    "rotate(360deg)"
                            }

                        ],

                        {

                            duration:
                                1000,

                            iterations:
                                2,

                            easing:
                                "ease-in-out"

                        }

                    );

                }

            );

        }

    },


    /* ========================================================
       6. BOUNCE MESSAGES
    ======================================================== */

    {

        name:
            "bounce-messages",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "bounce-messages",

                "🏀 Messages bouncing."

            );

        },


        async receive({
            getMessages
        }) {

            getMessagesArray(
                getMessages
            ).forEach(

                function(element) {

                    element.animate(

                        [

                            {
                                transform:
                                    "translateY(0)"
                            },

                            {
                                transform:
                                    "translateY(-70px)"
                            },

                            {
                                transform:
                                    "translateY(0)"
                            }

                        ],

                        {

                            duration:
                                600,

                            iterations:
                                4,

                            easing:
                                "cubic-bezier(.3,.8,.4,1)"

                        }

                    );

                }

            );

        }

    },


    /* ========================================================
       7. WAVE MESSAGES
    ======================================================== */

    {

        name:
            "wave-messages",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "wave-messages",

                "🌊 Wave sent."

            );

        },


        async receive({
            getMessages
        }) {

            const messages =
                getMessagesArray(
                    getMessages
                );


            messages.forEach(

                function(
                    element,
                    index
                ) {

                    setTimeout(

                        function() {

                            element.animate(

                                [

                                    {
                                        transform:
                                            "translateY(0)"
                                    },

                                    {
                                        transform:
                                            "translateY(-80px)"
                                    },

                                    {
                                        transform:
                                            "translateY(0)"
                                    }

                                ],

                                {

                                    duration:
                                        700,

                                    easing:
                                        "ease-in-out"

                                }

                            );

                        },

                        index *
                        90

                    );

                }

            );

        }

    },


    /* ========================================================
       8. FLOAT MESSAGES
    ======================================================== */

    {

        name:
            "float-messages",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "float-messages",

                "☁️ Messages floating."

            );

        },


        async receive({
            getMessages
        }) {

            getMessagesArray(
                getMessages
            ).forEach(

                function(element) {

                    element.animate(

                        [

                            {
                                transform:
                                    "translateY(0) rotate(0deg)"
                            },

                            {
                                transform:
                                    "translateY(-25px) rotate(3deg)"
                            },

                            {
                                transform:
                                    "translateY(10px) rotate(-3deg)"
                            },

                            {
                                transform:
                                    "translateY(0) rotate(0deg)"
                            }

                        ],

                        {

                            duration:
                                2500,

                            iterations:
                                3,

                            easing:
                                "ease-in-out"

                        }

                    );

                }

            );

        }

    },


    /* ========================================================
       9. FLIP MESSAGES
    ======================================================== */

    {

        name:
            "flip-messages",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "flip-messages",

                "🔄 Messages flipped."

            );

        },


        async receive({
            getMessages
        }) {

            getMessagesArray(
                getMessages
            ).forEach(

                function(element) {

                    element.animate(

                        [

                            {
                                transform:
                                    "rotateY(0deg)"
                            },

                            {
                                transform:
                                    "rotateY(180deg)"
                            },

                            {
                                transform:
                                    "rotateY(360deg)"
                            }

                        ],

                        {

                            duration:
                                1200,

                            easing:
                                "ease"

                        }

                    );

                }

            );

        }

    },


    /* ========================================================
       10. BLUR WALL
    ======================================================== */

    {

        name:
            "blur-wall",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "blur-wall",

                "🌫 Wall blurred."

            );

        },


        async receive() {

            document
                .getElementById(
                    "canvas-wall"
                )
                .style
                .filter =
                "blur(8px)";

        }

    },


    /* ========================================================
       11. INVERT WALL
    ======================================================== */

    {

        name:
            "invert-wall",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "invert-wall",

                "👽 Colors inverted."

            );

        },


        async receive() {

            document.documentElement
                .style
                .filter =
                "invert(1) hue-rotate(180deg)";

        }

    },


    /* ========================================================
       12. GRAYSCALE
    ======================================================== */

    {

        name:
            "grayscale-wall",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "grayscale-wall",

                "📺 Grayscale activated."

            );

        },


        async receive() {

            document.documentElement
                .style
                .filter =
                "grayscale(1)";

        }

    },


    /* ========================================================
       13. ZOOM WALL
    ======================================================== */

    {

        name:
            "zoom-wall",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "zoom-wall",

                "🔍 Wall zoom sent."

            );

        },


        async receive() {

            document.body.animate(

                [

                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(1.12)"
                    },

                    {
                        transform:
                            "scale(0.96)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }

                ],

                {

                    duration:
                        1300,

                    easing:
                        "ease-in-out"

                }

            );

        }

    },


    /* ========================================================
       14. FLASH WALL
    ======================================================== */

    {

        name:
            "flash-wall",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "flash-wall",

                "⚡ Flash sent."

            );

        },


        async receive() {

            const overlay =
                createOverlay(
                    "admin-flash-overlay",
                    "999999"
                );


            overlay.style.background =
                "white";


            overlay.animate(

                [

                    {
                        opacity:
                            0
                    },

                    {
                        opacity:
                            0.9
                    },

                    {
                        opacity:
                            0
                    }

                ],

                {

                    duration:
                        450,

                    iterations:
                        2

                }

            );


            setTimeout(

                function() {

                    overlay.remove();

                },

                1000

            );

        }

    },


    /* ========================================================
       15. BLACKOUT
    ======================================================== */

    {

        name:
            "blackout",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "blackout",

                "🌑 Blackout started."

            );

        },


        async receive() {

            const overlay =
                createOverlay(
                    "admin-blackout",
                    "999990"
                );


            overlay.style.background =
                "black";


            overlay.animate(

                [

                    {
                        opacity:
                            0
                    },

                    {
                        opacity:
                            1
                    },

                    {
                        opacity:
                            1
                    },

                    {
                        opacity:
                            0
                    }

                ],

                {

                    duration:
                        4000,

                    easing:
                        "ease",

                    fill:
                        "forwards"

                }

            );


            setTimeout(

                function() {

                    overlay.remove();

                },

                4100

            );

        }

    },


    /* ========================================================
       16. SPOTLIGHT
    ======================================================== */

    {

        name:
            "spotlight",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "spotlight",

                "🔦 Spotlight activated."

            );

        },


        async receive() {

            const overlay =
                createOverlay(
                    "admin-spotlight",
                    "999990"
                );


            overlay.style.background =
                "radial-gradient(circle at 50% 50%, transparent 0px, transparent 120px, rgba(0,0,0,.93) 200px)";


            overlay.animate(

                [

                    {
                        opacity:
                            0
                    },

                    {
                        opacity:
                            1
                    },

                    {
                        opacity:
                            1
                    },

                    {
                        opacity:
                            0
                    }

                ],

                {

                    duration:
                        4500,

                    fill:
                        "forwards"

                }

            );


            setTimeout(

                function() {

                    overlay.remove();

                },

                4600

            );

        }

    },


    /* ========================================================
       17. GIANT MESSAGES
    ======================================================== */

    {

        name:
            "giant-messages",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "giant-messages",

                "🦖 Messages enlarged."

            );

        },


        async receive({
            getMessages
        }) {

            getMessagesArray(
                getMessages
            ).forEach(

                function(element) {

                    element.style.fontSize =
                        "34px";

                    element.style.padding =
                        "18px 24px";

                }

            );

        }

    },


    /* ========================================================
       18. TINY MESSAGES
    ======================================================== */

    {

        name:
            "tiny-messages",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "tiny-messages",

                "🐜 Messages made tiny."

            );

        },


        async receive({
            getMessages
        }) {

            getMessagesArray(
                getMessages
            ).forEach(

                function(element) {

                    element.style.fontSize =
                        "8px";

                    element.style.padding =
                        "3px 5px";

                }

            );

        }

    },


    /* ========================================================
       19. HIDE MESSAGES
    ======================================================== */

    {

        name:
            "hide-messages",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "hide-messages",

                "👻 Messages hidden."

            );

        },


        async receive({
            getMessages
        }) {

            getMessagesArray(
                getMessages
            ).forEach(

                function(element) {

                    element.dataset
                        .adminHidden =
                        "true";


                    element.animate(

                        [

                            {

                                opacity:
                                    1,

                                transform:
                                    "scale(1)"

                            },

                            {

                                opacity:
                                    0,

                                transform:
                                    "scale(0)"

                            }

                        ],

                        {

                            duration:
                                400,

                            fill:
                                "forwards"

                        }

                    );


                    setTimeout(

                        function() {

                            element.style.display =
                                "none";

                        },

                        400

                    );

                }

            );

        }

    },


    /* ========================================================
       20. RESET EFFECTS
    ======================================================== */

    {

        name:
            "reset-effects",


        async run({
            broadcast,
            output
        }) {

            await sendUniversal(

                broadcast,

                output,

                "reset-effects",

                "♻️ All temporary effects reset."

            );

        },


        async receive({
            getMessages
        }) {

            /*
                Remove overlays.
            */

            const overlayIds = [

                "admin-snow-layer",

                "admin-emoji-rain",

                "admin-fireworks-layer",

                "admin-matrix-layer",

                "admin-flash-overlay",

                "admin-blackout",

                "admin-spotlight",

                "admin-confetti-layer"

            ];


            overlayIds.forEach(
                removeElementById
            );


            /*
                Remove filters.
            */

            document.documentElement
                .style
                .filter =
                "";


            const wall =
                document.getElementById(
                    "canvas-wall"
                );


            if (wall) {

                wall.style.filter =
                    "";

            }


            /*
                Remove rainbow mode if functionset1
                currently has it running.
            */

            removeElementById(
                "admin-rainbow-style"
            );


            /*
                Restore messages.
            */

            getMessagesArray(
                getMessages
            ).forEach(

                function(element) {

                    element.style.display =
                        "";

                    element.style.opacity =
                        "";

                    element.style.transform =
                        "";

                    element.style.fontSize =
                        "";

                    element.style.padding =
                        "";

                    element.dataset
                        .adminHidden =
                        "false";

                }

            );

        }

    }

];
