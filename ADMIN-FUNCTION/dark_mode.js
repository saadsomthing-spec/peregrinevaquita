export const command = {

    name:
        "dark-mode",


    async run({
        broadcast,
        output
    }) {


        await broadcast(
            "dark-mode"
        );


        output(
            "Dark mode sent to everyone."
        );


    },


    async receive() {


        document
            .body
            .classList
            .add(
                "dark"
            );


    }

};
