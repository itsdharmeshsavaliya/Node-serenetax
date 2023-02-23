import express from 'express';
const router = express.Router();

import auth from '../middlewares/auth';
import {
    //Client
    registerController,
    loginController,
    userController,
    personalinfoController,
    dependentinfoController,
    bankDetailsController,
    fbarController,
    otherInfoController,
    uploadDocumentsController,
    referralUsersController,
    messagesController,

    //Employee
    employeeLoginController,
    employeeHomeController
} from '../controllers';
//refreshController


//Client
router.get('/client/register/info', registerController.info);
router.post('/client/register', registerController.register);
router.post('/client/login', loginController.login);
router.get('/client/profile', auth, userController.me);
router.post('/client/editProfile', auth, userController.profile);
router.post('/client/changepassword', auth, userController.changePassword);
// router.post('/refresh', refreshController.refresh);
router.post('/client/logout', auth, loginController.logout);

router.get('/client/personalinfo', auth, personalinfoController.info);
router.post('/client/personalinfo/save', auth, personalinfoController.save);

router.get('/client/dependentinfo', auth, dependentinfoController.info);
router.post('/client/dependentinfo/save', auth, dependentinfoController.save);

router.get('/client/bankdetails', auth, bankDetailsController.info);
router.post('/client/bankdetails/save', auth, bankDetailsController.save);

router.get('/client/fbar', auth, fbarController.info);
router.post('/client/fbar/save', auth, fbarController.save);

//START Other Info
router.get('/client/otherincome/info', auth, otherInfoController.otherIncomeInfo);
router.post('/client/otherincome/save', auth, otherInfoController.otherIncomeSave);

router.get('/client/expenses/info', auth, otherInfoController.expensesInfo);
router.post('/client/expenses/save', auth, otherInfoController.expensesSave);

router.get('/client/rentalincome/info', auth, otherInfoController.rentalIncomeInfo);
router.post('/client/rentalincome/save', auth, otherInfoController.rentalIncomeSave);
//END

router.get('/client/documents', auth, uploadDocumentsController.info);
router.post('/client/documents/save', auth, uploadDocumentsController.save);
router.delete('/client/documents/delete/:document_id', auth, uploadDocumentsController.remove);

router.get('/client/referralUsers', auth, referralUsersController.info);
router.post('/client/referralUsers/add', auth, referralUsersController.save);

router.get('/client/messages', auth, messagesController.info);
router.post('/client/messages/send', auth, messagesController.send);



//Employee
router.post('/employee/login', employeeLoginController.login);
router.post('/employee/home/searchclient', employeeHomeController.searchclient);

export default router;