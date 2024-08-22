"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const config_1 = __importDefault(require("config"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const mailConfig = config_1.default.get('mail');
mail_1.default.setApiKey(mailConfig.sendgridAPIKey);
const sendMail = function (fromMailId, toMailId, subject, html = '') {
    if (!fromMailId || !toMailId) {
        console.error('ERROR while sending mail');
        if (!toMailId)
            console.error('Mail To Not Found - ', toMailId);
        else if (!toMailId)
            console.error('Mail From Not Found - ', toMailId);
        return true;
    }
    const msg = {
        to: toMailId, // should be email
        from: fromMailId, // should be object { name:'', email: '' }
        subject,
        html
    };
    try {
        console.log('--- sending mail ---');
        console.log(JSON.stringify(msg));
        return new Promise((res, rej) => {
            mail_1.default.send(msg)
                .then((data) => {
                console.log(data);
                console.log(`----- ${subject} MAIL SENT !-----`);
                console.log(`----- TO -> ${toMailId} -----`);
                return res(true);
            }).catch(err => {
                console.log(`----- ${subject} MAIL ERROR !-----`);
                console.log(err);
                return res(false);
            });
        });
    }
    catch (error) {
        console.log('sendMail function error');
        console.log(error);
    }
};
exports.sendMail = sendMail;
exports.default = exports.sendMail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL21haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLDBEQUFvQztBQUVwQyxNQUFNLFVBQVUsR0FLWixnQkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV2QixjQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUVyQyxNQUFNLFFBQVEsR0FBRyxVQUFVLFVBQWtCLEVBQUUsUUFBZ0IsRUFBRSxPQUFlLEVBQUUsT0FBZSxFQUFFO0lBRXhHLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzFELElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLEdBQUcsR0FBRztRQUNWLEVBQUUsRUFBRSxRQUFRLEVBQUUsa0JBQWtCO1FBQ2hDLElBQUksRUFBRSxVQUFVLEVBQUUsMENBQTBDO1FBQzVELE9BQU87UUFDUCxJQUFJO0tBQ0wsQ0FBQztJQUVGLElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzlCLGNBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNiLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxPQUFPLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxRQUFRLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLE9BQU8sb0JBQW9CLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztBQUNILENBQUMsQ0FBQTtBQXJDWSxRQUFBLFFBQVEsWUFxQ3BCO0FBQ0Qsa0JBQWUsZ0JBQVEsQ0FBQyJ9