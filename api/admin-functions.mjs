import fs from "fs";
import path from "path";


export default function handler(
    request,
    response
) {

    try {

        const adminFolder =
            path.join(
                process.cwd(),
                "ADMIN-FUNCTION"
            );


        if (
            !fs.existsSync(
                adminFolder
            )
        ) {

            return response
                .status(200)
                .json({

                    success: true,

                    files: []

                });

        }


        const files =
            fs.readdirSync(
                adminFolder
            )

            .filter(
                file =>
                    file.endsWith(
                        ".js"
                    )
            )

            .filter(
                file =>
                    !file.startsWith(
                        "_"
                    )
            );


        return response
            .status(200)
            .json({

                success: true,

                files: files

            });

    }

    catch (error) {

        console.error(
            "Admin function scan failed:",
            error
        );


        return response
            .status(500)
            .json({

                success: false,

                error:
                    error.message

            });

    }

}
