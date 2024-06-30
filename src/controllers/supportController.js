const { Support } = require("./../models");
const { sendMail } = require("./../utils/mail");
const { supportMail } = require("./../utils/templates");
const sendSupportEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Support.create(req.body);
    supportMail.replace("Hi there", `Hi ${enquiry.name}`);
    await sendMail(enquiry.to, "Thank You for Reaching to us!", supportMail);
    return res
      .status(200)
      .json({
        success: true,
        message: "Successfully send support enquiry",
        data: enquiry,
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


module.exports={
    sendSupportEnquiry
}
