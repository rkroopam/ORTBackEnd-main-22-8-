const setHTML = (verifyLink: string, password: string, invitationFor: string) => {
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
    `)
}



const inviteTemplate = (data: { link: string, password: string, invitationFor: string }) => {
    const { link, password, invitationFor } = data;
    const readyHTML = setHTML(link, password, invitationFor)

    return {
        subject: `ORT ${invitationFor} Invitation`,
        html: readyHTML
    }
}

export default inviteTemplate;