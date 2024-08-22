"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setHTML = (restPasswordLink) => {
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
            <p>Please click the button below to reset your ORT account password.</p>
            <a href="${restPasswordLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Reset Password</a>
        </div>
    </body>
    </html>
    `);
};
const restPasswordTemplate = (data) => {
    const { restPasswordLink } = data;
    const readyHTML = setHTML(restPasswordLink);
    return {
        subject: 'Reset your ORT password',
        html: readyHTML
    };
};
exports.default = restPasswordTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXRQYXNzd29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXBsYXRlcy9tYWlscy9yZXNldFBhc3N3b3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxPQUFPLEdBQUcsQ0FBQyxnQkFBd0IsRUFBRSxFQUFFO0lBQ3pDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7dUJBV1csZ0JBQWdCOzs7O0tBSWxDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUlELE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxJQUFrQyxFQUFFLEVBQUU7SUFDaEUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRTNDLE9BQU87UUFDSCxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLElBQUksRUFBRSxTQUFTO0tBQ2xCLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFRCxrQkFBZSxvQkFBb0IsQ0FBQyJ9