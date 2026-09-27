export const command = {

    name:
        "light-mode",


    async run({
        broadcast,
        output
    }) {


        await broadcast(
            "light-mode"
        );


        output(
            "Light mode sent to everyone."
        );


    },


    async receive() {


        document
            .body
            .classList
            .remove(
                "dark"
            );


    }

};
