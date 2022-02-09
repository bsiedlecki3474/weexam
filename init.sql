/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`weexam` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `weexam`;

/*Table structure for table `wee_groups` */

DROP TABLE IF EXISTS `wee_groups`;

CREATE TABLE `wee_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(10) unsigned DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_wee_groups_created_by` (`created_by`),
  KEY `fk_wee_groups_modified_by` (`modified_by`),
  CONSTRAINT `fk_wee_groups_created_by` FOREIGN KEY (`created_by`) REFERENCES `wee_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_wee_groups_modified_by` FOREIGN KEY (`modified_by`) REFERENCES `wee_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Table structure for table `wee_groups_users` */

DROP TABLE IF EXISTS `wee_groups_users`;

CREATE TABLE `wee_groups_users` (
  `group_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `fk_wee_groups_users_user_id` (`user_id`),
  CONSTRAINT `fk_wee_groups_users_group_id` FOREIGN KEY (`group_id`) REFERENCES `wee_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_groups_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `wee_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `wee_users` */

DROP TABLE IF EXISTS `wee_users`;

CREATE TABLE `wee_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `role` enum('root','admin','user') DEFAULT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(10) unsigned DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `wee_users` */

insert  into `wee_users`(`id`,`username`,`password`,`first_name`,`last_name`,`role`,`is_active`,`created_on`,`created_by`,`modified_on`,`modified_by`) values 
(1,'root','$2a$10$8dGOKOFbmSfGMvPMFBvcleaYcqvykdTYqCoFnXDFd8vIdpXmv0nvG','root','root','root',1,'2021-12-17 23:22:49',1,NULL,NULL);

DROP TABLE IF EXISTS `wee_tests`;

CREATE TABLE `wee_tests` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `duration` int unsigned default null,
  `show_scores` tinyint unsigned NOT NULL DEFAULT '1',
  `is_active` tinyint unsigned NOT NULL DEFAULT '0',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int unsigned DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

DROP TABLE IF EXISTS `wee_tests_groups`;

CREATE TABLE `wee_tests_groups` (
  `test_id` int unsigned NOT NULL,
  `group_id` int unsigned NOT NULL,
  PRIMARY KEY (`test_id`,`group_id`),
  KEY `fk_wee_tests_groups_test_id` (`test_id`),
  CONSTRAINT `fk_wee_tests_groups_test_id` FOREIGN KEY (`test_id`) REFERENCES `wee_tests` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_tests_groups_group_id` FOREIGN KEY (`group_id`) REFERENCES `wee_groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
