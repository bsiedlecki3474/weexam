CREATE DATABASE IF NOT EXISTS `weexam`;

USE `weexam`;

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
) DEFAULT CHARSET UTF8;

INSERT INTO `wee_groups` (`id`,`name`,`is_active`,`created_by`,`created_on`) VALUES 
(1,'IZ07IO2',1,1,'2022-01-09 12:45:37'),
(2,'IZ07TC1',1,1,'2022-01-09 12:45:46');

DROP TABLE IF EXISTS `wee_groups_users`;

CREATE TABLE `wee_groups_users` (
  `group_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `fk_wee_groups_users_user_id` (`user_id`),
  CONSTRAINT `fk_wee_groups_users_group_id` FOREIGN KEY (`group_id`) REFERENCES `wee_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_groups_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `wee_users` (`id`) ON DELETE CASCADE
) DEFAULT CHARSET UTF8;

INSERT INTO `wee_groups_users` (`group_id`,`user_id`) VALUES 
(1,2);

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
  CONSTRAINT `fk_wee_users_created_by` FOREIGN KEY (`created_by`) REFERENCES `wee_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_wee_users_modified_by` FOREIGN KEY (`modified_by`) REFERENCES `wee_users` (`id`) ON DELETE SET NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET UTF8;

INSERT INTO `wee_users` (`id`,`username`,`password`,`first_name`,`last_name`,`role`,`is_active`,`created_on`,`created_by`,`modified_on`,`modified_by`) VALUES 
(1,'root','$2a$10$8dGOKOFbmSfGMvPMFBvcleaYcqvykdTYqCoFnXDFd8vIdpXmv0nvG','root','root','root',1,'2021-12-17 23:22:49',1,NULL,NULL),
(2,'user1','$2a$10$/fPYvPTHfxIddg/1.4ZoJOWhtHvw.yIC/a8icIANvliJSuKttlyjy','janusz','testowy','user',1,'2021-12-17 23:37:41',1,NULL,NULL),
(3,'teacher1','$2a$10$np9n5g75bVEHZiEvK24aMOTXoKIHvnEdbZPopgx1P.JCbcroWq2D2','profesor','testowy','admin',1,'2021-12-20 01:52:45',1,NULL,NULL),
(4,'asd','$2a$10$UkesnosovZaErzKJw.UDruJiNKUKZtEVzcTGPE2/sB0dPxK1gTYEO','asd','asd','user',0,'2022-01-30 00:04:26',1,NULL,NULL);

DROP TABLE IF EXISTS `wee_tests`;

CREATE TABLE `wee_tests` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `show_scores` tinyint unsigned NOT NULL DEFAULT '1',
  `is_active` tinyint unsigned NOT NULL DEFAULT '0',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int unsigned DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int unsigned DEFAULT NULL,
  CONSTRAINT `fk_wee_tests_created_by` FOREIGN KEY (`created_by`) REFERENCES `wee_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_wee_tests_modified_by` FOREIGN KEY (`modified_by`) REFERENCES `wee_users` (`id`) ON DELETE SET NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET UTF8;

INSERT INTO `wee_tests` (`id`, `name`, `show_scores`, `is_active`, `created_on`, `created_by`) VALUES
(1, 'Test z BSK', 1, 1, '2022-02-09 20:16:28', 1),
(2, 'Test 2', 0, 0, '2022-02-18 17:43:58', 1);

DROP TABLE IF EXISTS `wee_tests_events`;

CREATE TABLE `wee_tests_events` (  
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `test_id` INT UNSIGNED,
  `start_date` DATETIME,
  `end_date` DATETIME,
  `duration` INT UNSIGNED,
  `is_active` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0',
  CONSTRAINT `fk_wee_tests_events_test_id` FOREIGN KEY (`test_id`) REFERENCES `wee_tests` (`id`) ON DELETE CASCADE
) DEFAULT CHARSET UTF8;

DROP TABLE IF EXISTS `wee_events_groups`;

CREATE TABLE `wee_events_groups` (
  `event_id` int unsigned NOT NULL,
  `group_id` int unsigned NOT NULL,
  PRIMARY KEY (`event_id`,`group_id`),
  CONSTRAINT `fk_wee_events_groups_event_id` FOREIGN KEY (`event_id`) REFERENCES `wee_tests_events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_events_groups_group_id` FOREIGN KEY (`group_id`) REFERENCES `wee_groups` (`id`) ON DELETE CASCADE
) DEFAULT CHARSET UTF8;


INSERT INTO `wee_tests_events` (`id`, `test_id`, `start_date`, `end_date`, `duration`) VALUES
(1, 1, '2022-03-06 11:00:00', '2022-03-06 12:00:00', 30),
(2, 1, '2022-03-13 09:00:00', '2022-03-13 10:00:00', 30);

DROP TABLE IF EXISTS `wee_questions_answer_types`;

CREATE TABLE `wee_questions_answer_types` (  
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(20)
) DEFAULT CHARSET UTF8;

INSERT INTO `wee_questions_answer_types` (`id`, `name`) VALUES
(1, 'Single choice'),
(2, 'Multiple choice');


DROP TABLE IF EXISTS `wee_tests_questions`;
DROP TABLE IF EXISTS `wee_questions_answers`;

CREATE TABLE `wee_tests_questions` (
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `test_id` INT UNSIGNED NOT NULL,
  `content` TEXT NOT NULL,
  `answer_type_id` INT UNSIGNED NOT NULL,
  KEY `fk_wee_tests_questions_test_id` (`test_id`),
  CONSTRAINT `fk_wee_tests_questions_test_id` FOREIGN KEY (`test_id`) REFERENCES `wee_tests` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_tests_questions_answer_type_id` FOREIGN KEY (`answer_type_id`) REFERENCES `wee_questions_answer_types` (`id`) ON DELETE CASCADE
) DEFAULT CHARSET UTF8;

CREATE TABLE `wee_questions_answers` (
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `question_id` INT UNSIGNED NOT NULL,
  `value` TEXT NOT NULL,
  `checked` TINYINT(1) NOT NULL,
  KEY `fk_wee_questions_answers_question_id` (`question_id`),
  CONSTRAINT `fk_wee_questions_answers_question_id` FOREIGN KEY (`question_id`) REFERENCES `wee_tests_questions` (`id`) ON DELETE CASCADE
) DEFAULT CHARSET UTF8;

INSERT INTO `wee_tests_questions` (`id`, `test_id`, `content`, `answer_type_id`) VALUES
(1, 1, "Kiedy odkryto amerykę?", 1),
(2, 1, "24=", 2);

INSERT INTO `wee_questions_answers` (`id`, `question_id`, `value`, `checked`) VALUES
(1, 1, 1491, 0),
(2, 1, 1492, 1),
(3, 1, 1493, 0),
(4, 1, 1494, 0),
(5, 2, "12+12", 1),
(6, 2, "sqrt(484)", 0),
(7, 2, "6*4", 1),
(8, 2, "28-7", 0),
(9, 2, "-24+48", 1);

DROP TABLE IF EXISTS `wee_tests_assessments`;

CREATE TABLE `wee_tests_assessments` (  
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `event_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `start_date` DATETIME,
  `end_date` DATETIME,
  `user_finished` TINYINT(1) UNSIGNED NOT NULL,
  `created_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` INT UNSIGNED NOT NULL,
  CONSTRAINT `fk_wee_tests_assessments_event_id` FOREIGN KEY (`event_id`) REFERENCES `wee_tests_events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_tests_assessments_user_id` FOREIGN KEY (`user_id`) REFERENCES `wee_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_tests_assessments_created_by` FOREIGN KEY (`created_by`) REFERENCES `wee_users` (`id`) ON DELETE CASCADE
) DEFAULT CHARSET UTF8;

DROP TABLE IF EXISTS `wee_tests_assessments_answers`;

CREATE TABLE `wee_tests_assessments_answers` (
  `assessment_id` INT UNSIGNED NOT NULL,
  `question_id` INT UNSIGNED NOT NULL,
  `answer_id` INT UNSIGNED NOT NULL,
  `created_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`assessment_id`,`question_id`, `answer_id`),
  CONSTRAINT `fk_wee_tests_assessments_answers_assessment_id` FOREIGN KEY (`assessment_id`) REFERENCES `wee_tests_assessments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_tests_assessments_answers_question_id` FOREIGN KEY (`question_id`) REFERENCES `wee_tests_questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_tests_assessments_answers_answer_id` FOREIGN KEY (`answer_id`) REFERENCES `wee_questions_answers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wee_tests_assessments_answers_created_by` FOREIGN KEY (`created_by`) REFERENCES `wee_users` (`id`) ON DELETE CASCADE
) DEFAULT CHARSET UTF8;