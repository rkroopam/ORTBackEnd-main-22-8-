"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setHTML = (verifyLink) => {
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
            <a href="${verifyLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Verify Account</a>
        </div>
    </body>
    </html>
    `);
};
const signUpTemplate = (data) => {
    const { verifyLink } = data;
    const readyHTML = setHTML(verifyLink);
    return {
        subject: 'Welcome to ORT',
        html: readyHTML
    };
};
exports.default = signUpTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RlcGxhdGVzL21haWxzL3NpZ251cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sT0FBTyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQ25DLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7dUJBV1csVUFBVTs7OztLQUk1QixDQUFDLENBQUE7QUFDTixDQUFDLENBQUE7QUFJRCxNQUFNLGNBQWMsR0FBRyxDQUFDLElBQTRCLEVBQUUsRUFBRTtJQUNwRCxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQzVCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUVyQyxPQUFPO1FBQ0gsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixJQUFJLEVBQUUsU0FBUztLQUNsQixDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsY0FBYyxDQUFDIn0=