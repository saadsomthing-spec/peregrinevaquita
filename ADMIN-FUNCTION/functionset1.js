function getMessageElements(getMessages) {
    return Array.from(getMessages());
}


async function simpleBroadcast(
    broadcast,
    output,
    commandName,
    successMessage
) {
    await broadcast(commandName);
    output(successMessage);
}


export const commands = [

    {
        name: "confetti",

        async run({
            broadcast,
            output
        }) {

            await simpleBroadcast(
                broadcast,
                output,
                "confetti",
                "🎉 Confetti sent to everyone."
            );

        },

        async receive() {

            const oldLayer =
                document.getElementById(
                    "admin-confetti-layer"
                );

            if (oldLayer) {
                oldLayer.remove();
            }

            const layer =
                document.createElement(
                    "div"
                );

            layer.id =
                "admin-confetti-layer";

            Object.assign(
                layer.style,
                {
                    position: "fixed",
                    inset: "0",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: "999999"
                }
            );

            document.body.appendChild(
                layer
            );

            const colors = [
                "#ff4757",
                "#ffa502",
                "#2ed573",
                "#1e90ff",
                "#a55eea",
                "#ff6b81",
                "#f1c40f"
            ];

            for (
                let i = 0;
                i < 170;
                i++
            ) {
                const piece =
                    document.createElement(
                        "div"
                    );

                const size =
                    6 + Math.random() * 10;

                Object.assign(
                    piece.style,
                    {
                        position: "absolute",
                        width: size + "px",
                        height:
                            size * 1.6 + "px",
                        left:
                            Math.random() *
                                100 +
                            "vw",
                        top: "-30px",
                        background:
                            colors[
                                Math.floor(
                                    Math.random() *
                                        colors.length
                                )
                            ],
                        opacity: "0.95",
                        borderRadius: "2px"
                    }
                );

                layer.appendChild(
                    piece
                );

                const xMovement =
                    Math.random() * 300 -
                    150;

                const rotation =
                    Math.random() * 1000;

                const duration =
                    1800 +
                    Math.random() * 2200;

                piece.animate(
                    [
                        {
                            transform:
                                "translate(0, 0) rotate(0deg)"
                        },
                        {
                            transform:
                                `translate(${xMovement}px, 110vh) rotate(${rotation}deg)`
                        }
                    ],
                    {
                        duration: duration,
                        easing:
                            "cubic-bezier(.2,.7,.3,1)",
                        fill: "forwards"
                    }
                );
            }

            setTimeout(
                function() {
                    layer.remove();
                },
                4500
            );

        }
    },

    {
        name: "pulse-messages",

        async run({
            broadcast,
            output
        }) {

            await simpleBroadcast(
                broadcast,
                output,
                "pulse-messages",
                "💓 Pulse sent to everyone."
            );

        },

        async receive({
            getMessages
        }) {

            const messages =
                getMessageElements(
                    getMessages
                );

            messages.forEach(
                function(element) {
                    element.animate(
                        [
                            {
                                transform:
                                    "scale(1)"
                            },
                            {
                                transform:
                                    "scale(1.18)"
                            },
                            {
                                transform:
                                    "scale(0.95)"
                            },
                            {
                                transform:
                                    "scale(1.12)"
                            },
                            {
                                transform:
                                    "scale(1)"
                            }
                        ],
                        {
                            duration: 1200,
                            iterations: 3,
                            easing:
                                "ease-in-out"
                        }
                    );
                }
            );

        }
    },

    {
        name: "shake-wall",

        async run({
            broadcast,
            output
        }) {

            await simpleBroadcast(
                broadcast,
                output,
                "shake-wall",
                "🌪 Shake sent to everyone."
            );

        },

        async receive({
            getMessages
        }) {

            const messages =
                getMessageElements(
                    getMessages
                );

            messages.forEach(
                function(element) {
                    element.animate(
                        [
                            {
                                transform:
                                    "translateX(0)"
                            },
                            {
                                transform:
                                    "translateX(-15px) rotate(-2deg)"
                            },
                            {
                                transform:
                                    "translateX(15px) rotate(2deg)"
                            },
                            {
                                transform:
                                    "translateX(-12px) rotate(-1deg)"
                            },
                            {
                                transform:
                                    "translateX(12px) rotate(1deg)"
                            },
                            {
                                transform:
                                    "translateX(-6px)"
                            },
                            {
                                transform:
                                    "translateX(6px)"
                            },
                            {
                                transform:
                                    "translateX(0)"
                            }
                        ],
                        {
                            duration: 700,
                            easing: "ease"
                        }
                    );
                }
            );

        }
    },

    {
        name: "dark-mode",

        async run({
            broadcast,
            output
        }) {

            await simpleBroadcast(
                broadcast,
                output,
                "dark-mode",
                "🌙 Dark mode sent to everyone."
            );

        },

        async receive() {

            document.body.classList.add(
                "dark"
            );

        }
    },

    {
        name: "light-mode",

        async run({
            broadcast,
            output
        }) {

            await simpleBroadcast(
                broadcast,
                output,
                "light-mode",
                "☀️ Light mode sent to everyone."
            );

        },

        async receive() {

            document.body.classList.remove(
                "dark"
            );

            const rainbowStyle =
                document.getElementById(
                    "admin-rainbow-style"
                );

            if (rainbowStyle) {
                rainbowStyle.remove();
            }

        }
    },

    {
        name: "rainbow-wall",

        async run({
            broadcast,
            output
        }) {

            await simpleBroadcast(
                broadcast,
                output,
                "rainbow-wall",
                "🌈 Rainbow mode sent to everyone."
            );

        },

        async receive() {

            const existing =
                document.getElementById(
                    "admin-rainbow-style"
                );

            if (existing) {
                existing.remove();
            }

            const style =
                document.createElement(
                    "style"
                );

            style.id =
                "admin-rainbow-style";

            style.textContent = `
                @keyframes adminRainbowBackground {
                    0% { background: #ff4757; }
                    16% { background: #ff9f43; }
                    32% { background: #feca57; }
                    48% { background: #1dd1a1; }
                    64% { background: #54a0ff; }
                    80% { background: #5f27cd; }
                    100% { background: #ff4757; }
                }

                body {
                    animation: adminRainbowBackground 5s linear infinite !important;
                }
            `;

            document.head.appendChild(
                style
            );

            setTimeout(
                function() {
                    style.remove();
                },
                15000
            );

        }
    }

];
