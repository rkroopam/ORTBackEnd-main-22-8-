"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setHTML = (verifyLink) => {
    return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test ORT Mail</title>
    </head>
    <body style="font-size: 14px; margin: 0px; padding: 20px 10px; fontFamily: Arial, sans-serif;">
        <div>
            <p>It is a test mail.</p>
            <a href="${verifyLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Test Mail</a>
        </div>
    </body>
    </html>
    `);
};
const testTemplate = () => {
    const readyHTML = setHTML('');
    return {
        subject: 'Welcome to ORT',
        html: readyHTML
    };
};
exports.default = testTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXBsYXRlcy9tYWlscy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxPQUFPLEdBQUcsQ0FBQyxVQUFrQixFQUFFLEVBQUU7SUFDbkMsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozt1QkFXVyxVQUFVOzs7O0tBSTVCLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUlELE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUN0QixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFN0IsT0FBTztRQUNILE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsSUFBSSxFQUFFLFNBQVM7S0FDbEIsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVELGtCQUFlLFlBQVksQ0FBQyJ9