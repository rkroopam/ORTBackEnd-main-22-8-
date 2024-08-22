"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setHTML = (verifyLink, password, invitationFor) => {
    return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify ORT Account</title>
    </head>
    <body style="font-size: 14px; margin: 0px; padding: 20px 10px; fontFamily: Arial, sans-serif;">
        <div>
            <p>Please click the button below to verify your ORT account.</p>
            <p>After you click the button for verification, use this Password: <b>${password}</b> to ORT Sign In as <b>${invitationFor}</b></p>
            <a href="${verifyLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Verify Account</a>
        </div>
    </body>
    </html>
    `);
};
const inviteTemplate = (data) => {
    const { link, password, invitationFor } = data;
    const readyHTML = setHTML(link, password, invitationFor);
    return {
        subject: `ORT ${invitationFor} Invitation`,
        html: readyHTML
    };
};
exports.default = inviteTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RlcGxhdGVzL21haWxzL2ludml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sT0FBTyxHQUFHLENBQUMsVUFBa0IsRUFBRSxRQUFnQixFQUFFLGFBQXFCLEVBQUUsRUFBRTtJQUM1RSxPQUFPLENBQUM7Ozs7Ozs7Ozs7O29GQVd3RSxRQUFRLDZCQUE2QixhQUFhO3VCQUMvRyxVQUFVOzs7O0tBSTVCLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUlELE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBK0QsRUFBRSxFQUFFO0lBQ3ZGLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQztJQUMvQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUV4RCxPQUFPO1FBQ0gsT0FBTyxFQUFFLE9BQU8sYUFBYSxhQUFhO1FBQzFDLElBQUksRUFBRSxTQUFTO0tBQ2xCLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFRCxrQkFBZSxjQUFjLENBQUMifQ==