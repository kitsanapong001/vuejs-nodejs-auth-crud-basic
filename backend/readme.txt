ติดตั้ง nodejs โดยโหลดที่หน้าเว็บไซด์

npm install express body-parser nodemon mysql2 cors bcryptjs formidable jsonwebtoken uuid
      
CREATE TABLE IF NOT EXISTS `users` (
  user_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_username varchar(255) NOT NULL,
  user_password varchar(255),
	user_firstname varchar(255),
	user_lastname varchar(255),
	user_email varchar(255),
	role_id int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `roles` (
  role_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  role_name varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `products` (
  product_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_name varchar(255) NOT NULL,
  product_quanlity int(11),
	product_detail varchar(255),
	product_status int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;