#
# Encoding: Unicode (UTF-8)
#


DROP TABLE IF EXISTS `wooo_options`;
DROP TABLE IF EXISTS `wooo_products`;
DROP TABLE IF EXISTS `wooo_settings`;


CREATE TABLE `wooo_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(128) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  `price` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;


CREATE TABLE `wooo_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL DEFAULT '',
  `price` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;


CREATE TABLE `wooo_settings` (
  `name` varchar(128) DEFAULT NULL,
  `value` varchar(128) DEFAULT NULL,
  `section` varchar(128) DEFAULT NULL,
  `opts` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;




SET FOREIGN_KEY_CHECKS = 0;


LOCK TABLES `wooo_options` WRITE;
INSERT INTO `wooo_options` (`id`, `product_id`, `name`, `price`) VALUES (1, 1, 'red', 20);
INSERT INTO `wooo_options` (`id`, `product_id`, `name`, `price`) VALUES (2, 1, 'blue', 12);
INSERT INTO `wooo_options` (`id`, `product_id`, `name`, `price`) VALUES (8, 10, 'wohoo', 22);
INSERT INTO `wooo_options` (`id`, `product_id`, `name`, `price`) VALUES (5, 1, 'purple', 22);
INSERT INTO `wooo_options` (`id`, `product_id`, `name`, `price`) VALUES (6, 10, 'super', 255);
INSERT INTO `wooo_options` (`id`, `product_id`, `name`, `price`) VALUES (7, 1, 'green', 45);
UNLOCK TABLES;


LOCK TABLES `wooo_products` WRITE;
INSERT INTO `wooo_products` (`id`, `name`, `price`) VALUES (1, 'product 1', 298);
INSERT INTO `wooo_products` (`id`, `name`, `price`) VALUES (10, 'product 2', 20);
UNLOCK TABLES;


LOCK TABLES `wooo_settings` WRITE;
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('user', 'admin', 'User', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('pass', '098f6bcd4621d373cade4e832627b4f6', 'User', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('currency', '$', 'General', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('currency-code', 'USD', 'General', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('gateway', 'paypal', 'Payment', 'paypal,moneybookers,paymex,2checkout');
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('paypal-email', 'your@email.com', 'Paypal', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('paypal-header', 'http://www.your-site.com/paypal.png', 'Paypal', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('merchant', '', 'Paymex', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('cart-name', 'My little Shop', '2Checkout', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('2checkout-sid', '', '2Checkout', NULL);
INSERT INTO `wooo_settings` (`name`, `value`, `section`, `opts`) VALUES ('MB-Email', '', 'Moneybookers', NULL);
UNLOCK TABLES;




SET FOREIGN_KEY_CHECKS = 1;


