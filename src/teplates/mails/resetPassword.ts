const setHTML = (restPasswordLink: string) => {
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
    `)
}



const restPasswordTemplate = (data: { restPasswordLink: string }) => {
    const { restPasswordLink } = data;
    const readyHTML = setHTML(restPasswordLink)

    return {
        subject: 'Reset your ORT password',
        html: readyHTML
    }
}

export default restPasswordTemplate;