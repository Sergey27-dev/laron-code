<?php
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$tel = filter_input(INPUT_POST, 'tel', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);

$message = isset($_POST['message']) ? filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING) : '';
$kol = isset($_POST['kol']) ? filter_input(INPUT_POST, 'kol', FILTER_SANITIZE_STRING) : '';
$option = isset($_POST['option']) ? filter_input(INPUT_POST, 'option', FILTER_SANITIZE_STRING) : '';

$emailMessage = "ФИО: ".$name."\n";
$emailMessage .= "Почта: ".$email."\n";
$emailMessage .= "Телефон: ".$tel."\n";

if(!empty($message)){
	$emailMessage .= "Сообщение: ".$message."\n";
}
if(!empty($option)){
	$emailMessage .= "Товар: ".$option."\n";
}
if(!empty($kol)){
	$emailMessage .= "Количество: ".$kol."\n";
}

require_once (dirname(__FILE__).'/vendor/google/recaptcha/src/autoload.php');

if(isset($_POST['captcha'])) {
	$recaptcha = new \ReCaptcha\ReCaptcha($secret);
	$resp = $recaptcha->verify($_POST['captcha'], $_SERVER['REMOTE_ADDR']);
	if($resp->isSuccess()) {

		require_once 'vendor/autoload.php';
		$transport = (new Swift_SmtpTransport('smtp.beget.com', 465, 'ssl'))
			->setUsername('')
			->setPassword('');
		$mailer = new Swift_Mailer($transport);

		$msg = new Swift_Message();
		$msg->setSubject("Заявка на звонок");
		$msg->setFrom(["noreply@elax55.ru" => "Почтовый робот"]);
		$msg->setTo("laron55@bk.ru");
		$msg->setBody("Здравствуйте новая заявка!\n\n"
			. $emailMessage
		);

		$result = $mailer->send($msg);
		if($result) {
			echo "mail sent";
		}
	}else {
		$errors = $resp->getErrorCodes();
		$data['error-captcha'] = $errors;
		$data['msg'] = 'Код капчи не прошёл проверку на сервере';
		$data['result'] = 'error';
	}
}else {
	$data['result'] = "error";
}