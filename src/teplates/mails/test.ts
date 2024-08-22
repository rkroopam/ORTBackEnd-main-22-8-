const setHTML = (verifyLink: string) => {
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
    `)
}



const testTemplate = () => {
    const readyHTML = setHTML('')

    return {
        subject: 'Welcome to ORT',
        html: readyHTML
    }
}

export default testTemplate;