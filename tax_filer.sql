-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 01, 2022 at 05:01 AM
-- Server version: 10.2.38-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tax_filer`
--

-- --------------------------------------------------------

--
-- Table structure for table `bankinfo_mast`
--

CREATE TABLE `bankinfo_mast` (
  `info_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `account_holder_name` varchar(200) NOT NULL,
  `bank_name` varchar(200) NOT NULL,
  `us_bank_routing_number` text NOT NULL,
  `us_bank_account_number` text NOT NULL,
  `account_type_id` int(5) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bankinfo_mast`
--

INSERT INTO `bankinfo_mast` (`info_id`, `user_id`, `account_holder_name`, `bank_name`, `us_bank_routing_number`, `us_bank_account_number`, `account_type_id`, `updated_at`, `created_at`) VALUES
(1, 2, 'Dharmesh', 'ICICI Bank', '2124543436', '335436665543', 2, '2022-11-21 17:12:13', '2022-11-21 17:10:06'),
(2, 20, 'Golla Raju', 'HSBC', '12345666666666666666666666', '1233333333333333333333333333333333333333333333333333', 1, '2022-11-30 17:00:51', '2022-11-30 17:00:51'),
(3, 22, 'CHANDRAKANTH', 'BOFA', '11321321', '13213213213213', 1, '2022-11-30 19:34:04', '2022-11-30 19:34:04');

-- --------------------------------------------------------

--
-- Table structure for table `dependent_mast`
--

CREATE TABLE `dependent_mast` (
  `dependent_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `mname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `relationship_id` int(20) NOT NULL,
  `irs_status_id` int(10) DEFAULT NULL,
  `ssn_itin` text DEFAULT NULL,
  `visa_type_id` int(10) DEFAULT NULL,
  `days_stayed` int(10) DEFAULT NULL,
  `institution_name` text DEFAULT NULL,
  `institution_tax_id` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `apartment` text DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` int(10) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dependent_mast`
--

INSERT INTO `dependent_mast` (`dependent_id`, `user_id`, `fname`, `mname`, `lname`, `dob`, `relationship_id`, `irs_status_id`, `ssn_itin`, `visa_type_id`, `days_stayed`, `institution_name`, `institution_tax_id`, `address`, `apartment`, `city`, `state`, `zip`, `updated_at`, `created_at`) VALUES
(1, 2, 'First', 'Middle', 'Last', '1995-02-25', 1, NULL, '', NULL, NULL, '', '', '', '', 'Jamnagar', 'Gujarat', 395006, '2022-11-26 13:14:06', '2022-11-21 16:50:43'),
(2, 20, 'Jr.Raju', 'Yadav', 'Golla', '2001-01-20', 2, 1, '123-33-3336', 11, 365, 'Hei baby', '12345678888888888888888888', '1234 lane', '03', 'Montessori', 'tx', 75015, '2022-11-30 16:58:36', '2022-11-30 16:58:36'),
(3, 22, 'Chandu', 'fsdfsdfsdf', 'paka', '2001-01-20', 1, 1, '416-51-6551', 2, 183, 'fggd', 'fgdgdfgd', 'gdfgdg', 'gdfdgd', 'fgdfdgfgd', 'fgdfgdgd', 20147, '2022-11-30 19:33:27', '2022-11-30 19:33:27');

-- --------------------------------------------------------

--
-- Table structure for table `dependent_residential_address_mast`
--

CREATE TABLE `dependent_residential_address_mast` (
  `dra_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `year` varchar(20) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dependent_residential_address_mast`
--

INSERT INTO `dependent_residential_address_mast` (`dra_id`, `user_id`, `year`, `data`, `updated_at`, `created_at`) VALUES
(1, 2, '2021', '[{\"state_of_residence\":\"Gujarat1\",\"from_date\":\"2022-01-11\",\"to_date\":\"2022-05-11\"},{\"state_of_residence\":\"Maharastra1\",\"from_date\":\"2022-05-12\",\"to_date\":\"2022-12-30\"}]', '2022-11-26 13:14:06', '2022-11-26 13:14:06');

-- --------------------------------------------------------

--
-- Table structure for table `documents_mast`
--

CREATE TABLE `documents_mast` (
  `document_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `year` int(10) NOT NULL,
  `document_name` varchar(100) NOT NULL,
  `document_type_id` int(10) NOT NULL,
  `document_comments` text NOT NULL,
  `document_file` text NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documents_mast`
--

INSERT INTO `documents_mast` (`document_id`, `user_id`, `year`, `document_name`, `document_type_id`, `document_comments`, `document_file`, `updated_at`, `created_at`) VALUES
(3, 21, 2022, 'w2', 1, '2021', 'uploads/documents/1669829334090-955062546.png', '2022-11-30 17:28:54', '2022-11-30 17:28:54');

-- --------------------------------------------------------

--
-- Table structure for table `employee_mast`
--

CREATE TABLE `employee_mast` (
  `employee_id` int(11) NOT NULL,
  `fullname` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT 'NULL',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee_mast`
--

INSERT INTO `employee_mast` (`employee_id`, `fullname`, `email`, `password`, `status`, `updated_at`, `created_at`) VALUES
(1, 'Dharmesh Employee', 'employee@gmail.com', '$2b$12$XEzvflRj5It4pbPTXJouOOxSPEFJaUQsVkrScNp4RzD2OU1wEwECG', 1, '2022-11-28 13:21:15', '2022-11-28 13:21:15');

-- --------------------------------------------------------

--
-- Table structure for table `expenses_mast`
--

CREATE TABLE `expenses_mast` (
  `exp_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `year` int(10) NOT NULL,
  `healthcare` tinyint(1) NOT NULL,
  `charitable_contributions` tinyint(1) NOT NULL,
  `home_mortgage` tinyint(1) NOT NULL,
  `casualty_theft_losses` tinyint(1) NOT NULL,
  `paid_alimony` tinyint(1) NOT NULL,
  `itemize_returns` tinyint(1) NOT NULL,
  `sales_excise_taxes` tinyint(1) NOT NULL,
  `resident_states` tinyint(1) NOT NULL,
  `family_health_insurance` tinyint(1) NOT NULL,
  `home_work_address` tinyint(1) NOT NULL,
  `hsa` tinyint(1) NOT NULL,
  `ira` tinyint(1) NOT NULL,
  `student_loan` tinyint(1) NOT NULL,
  `tuition_fee` tinyint(1) NOT NULL,
  `health_insurance_covered` tinyint(1) NOT NULL,
  `enrolled_insurance` tinyint(1) NOT NULL,
  `additional_contributions` tinyint(1) NOT NULL,
  `energy_saving_product` tinyint(1) NOT NULL,
  `hybrid_motor_vehicle` tinyint(1) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses_mast`
--

INSERT INTO `expenses_mast` (`exp_id`, `user_id`, `year`, `healthcare`, `charitable_contributions`, `home_mortgage`, `casualty_theft_losses`, `paid_alimony`, `itemize_returns`, `sales_excise_taxes`, `resident_states`, `family_health_insurance`, `home_work_address`, `hsa`, `ira`, `student_loan`, `tuition_fee`, `health_insurance_covered`, `enrolled_insurance`, `additional_contributions`, `energy_saving_product`, `hybrid_motor_vehicle`, `updated_at`, `created_at`) VALUES
(1, 2, 2021, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, '2022-11-29 15:24:59', '2022-11-29 15:24:39'),
(2, 2, 2022, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, '2022-11-29 15:25:40', '2022-11-29 15:25:14');

-- --------------------------------------------------------

--
-- Table structure for table `fbar_mast`
--

CREATE TABLE `fbar_mast` (
  `fbar_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `ownership` varchar(100) DEFAULT NULL,
  `bank_financial` varchar(200) DEFAULT NULL,
  `street_address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `account_number` varchar(100) DEFAULT NULL,
  `type_of_account` varchar(50) DEFAULT NULL,
  `if_others` text DEFAULT NULL,
  `foreign_currency` varchar(50) DEFAULT NULL,
  `income_earned` varchar(100) DEFAULT NULL,
  `total_income_earned` varchar(100) DEFAULT NULL,
  `maximum_value_of_account` varchar(100) DEFAULT NULL,
  `value_of_account` varchar(100) DEFAULT NULL,
  `name_of_joint_owner` varchar(100) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fbar_mast`
--

INSERT INTO `fbar_mast` (`fbar_id`, `user_id`, `ownership`, `bank_financial`, `street_address`, `city`, `state`, `postal_code`, `account_number`, `type_of_account`, `if_others`, `foreign_currency`, `income_earned`, `total_income_earned`, `maximum_value_of_account`, `value_of_account`, `name_of_joint_owner`, `updated_at`, `created_at`) VALUES
(1, 2, 'Test', '', '', 'Surat', 'Gujarat', '395006', '123456789', 'Saving', '', 'EUR', '', '700000', '', '', '', '2022-11-22 11:58:58', '2022-11-22 11:14:49'),
(2, 20, 'Joint', 'HDFC', '123654 lane', 'Hyderabad', 'Telangana', '500032', '12365498777', 'Savings', 'dd', 'INR', '150000', '150000', '15000', '14500', 'Mrs.Raju', '2022-11-30 17:04:04', '2022-11-30 17:04:04');

-- --------------------------------------------------------

--
-- Table structure for table `messages_mast`
--

CREATE TABLE `messages_mast` (
  `message_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `subject` text NOT NULL,
  `message_type_id` int(5) NOT NULL,
  `message` text NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages_mast`
--

INSERT INTO `messages_mast` (`message_id`, `user_id`, `subject`, `message_type_id`, `message`, `updated_at`, `created_at`) VALUES
(1, 10, 'Test Subject', 1, 'Test message', '2022-11-24 14:41:04', '2022-11-24 14:41:04'),
(2, 10, 'Test Subject 1', 2, 'Test message 1', '2022-11-24 14:41:32', '2022-11-24 14:41:32'),
(3, 10, 'Test Subject 2', 3, 'Test message 2', '2022-11-24 15:42:23', '2022-11-24 15:42:23'),
(4, 10, 'Test Subject 3', 4, 'Test message 3', '2022-11-24 16:32:43', '2022-11-24 16:32:43');

-- --------------------------------------------------------

--
-- Table structure for table `other_income_mast`
--

CREATE TABLE `other_income_mast` (
  `oi_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `year` int(10) NOT NULL,
  `interest_dividend` tinyint(1) NOT NULL,
  `business_income` tinyint(1) NOT NULL,
  `sold_stocks` tinyint(1) NOT NULL,
  `sold_espp` tinyint(1) NOT NULL,
  `rental_income` tinyint(1) NOT NULL,
  `earned_interest` tinyint(1) NOT NULL,
  `draw_money_hsa` tinyint(1) NOT NULL,
  `draw_money_ira` tinyint(1) NOT NULL,
  `received_refund` tinyint(1) NOT NULL,
  `received_compensation` tinyint(1) NOT NULL,
  `income_or_losses` tinyint(1) NOT NULL,
  `received_third_party_payment` tinyint(1) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `other_income_mast`
--

INSERT INTO `other_income_mast` (`oi_id`, `user_id`, `year`, `interest_dividend`, `business_income`, `sold_stocks`, `sold_espp`, `rental_income`, `earned_interest`, `draw_money_hsa`, `draw_money_ira`, `received_refund`, `received_compensation`, `income_or_losses`, `received_third_party_payment`, `updated_at`, `created_at`) VALUES
(1, 2, 2022, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, '2022-11-29 14:53:53', '2022-11-29 14:53:53'),
(2, 2, 2021, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2022-11-29 15:26:32', '2022-11-29 14:54:51');

-- --------------------------------------------------------

--
-- Table structure for table `referral_mast`
--

CREATE TABLE `referral_mast` (
  `referral_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `referral_user_id` int(20) NOT NULL,
  `type` varchar(10) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `referral_mast`
--

INSERT INTO `referral_mast` (`referral_id`, `user_id`, `referral_user_id`, `type`, `created_at`) VALUES
(1, 10, 2, 'register', '2022-11-24 11:51:15'),
(2, 10, 1, 'mannual', '2022-11-24 13:35:40'),
(3, 11, 1, 'register', '2022-11-24 13:41:16'),
(4, 12, 1, 'register', '2022-11-28 12:28:09'),
(5, 2, 1, 'mannual', '2022-11-29 11:34:02'),
(8, 13, 1, 'register', '2022-11-30 06:24:56'),
(9, 14, 1, 'register', '2022-11-30 06:30:36'),
(10, 15, 1, 'register', '2022-11-30 06:36:53'),
(11, 16, 1, 'register', '2022-11-30 06:44:52'),
(12, 17, 1, 'register', '2022-11-30 06:46:29'),
(13, 18, 2, 'mannual', '2022-11-30 06:55:35');

-- --------------------------------------------------------

--
-- Table structure for table `refreshtokens`
--

CREATE TABLE `refreshtokens` (
  `id` int(20) NOT NULL,
  `token` text NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `refreshtokens`
--

INSERT INTO `refreshtokens` (`id`, `token`, `updated_at`, `created_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2Njg1MTE3OTMsImV4cCI6MTcwMDA2OTM5M30.pfz-Zr9sJ0edARpjObMiYwkI7sVvt1Wa7Y49gK3MfN0', '2022-11-15 16:59:53', '2022-11-15 16:59:53'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2Njg1MTE4MDUsImV4cCI6MTcwMDA2OTQwNX0.4KMMGYVwDLu0H9aaX0hnJQSRUsObHbxWVb-QjFD7wCA', '2022-11-15 17:00:05', '2022-11-15 17:00:05'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njg1MTMxNjAsImV4cCI6MTcwMDA3MDc2MH0.v3fcxR6rdmymsAwDUkS73hAqsJHXhJnqqQfoVBnm7Jg', '2022-11-15 17:22:40', '2022-11-15 17:22:40'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njg1MTQwMzcsImV4cCI6MTcwMDA3MTYzN30.LrJRZ_4KfC-6Fm0jIvICwQ40rwHo7qCVPd2clQkebLQ', '2022-11-15 17:37:17', '2022-11-15 17:37:17'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njg1ODYxNzYsImV4cCI6MTcwMDE0Mzc3Nn0.etSWziRnQIkuafl_jMmomMnHZh0divXE-ullPN2tSCk', '2022-11-16 13:39:36', '2022-11-16 13:39:36'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE2Njg4NDIwOTMsImV4cCI6MTcwMDM5OTY5M30.d8dMALAbL1EORzr4-Gv01fEWnzbWcgwYdQzF0PPJXdQ', '2022-11-19 12:44:53', '2022-11-19 12:44:53'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE2Njg4NDIyNDAsImV4cCI6MTcwMDM5OTg0MH0.142sQH2LBFaIj59Jq4YzjedRKEvzgLVsxJqPD9z43Hs', '2022-11-19 12:47:20', '2022-11-19 12:47:20'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE2NjkwMTg0NDIsImV4cCI6MTcwMDU3NjA0Mn0.7TQuOVj-bfgIs9W1D6XtJnpa1XQFGknMSkzrAl9hSzs', '2022-11-21 13:44:02', '2022-11-21 13:44:02'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NjkxOTY4NjIsImV4cCI6MTcwMDc1NDQ2Mn0.wTKNTRoDOaKpewO46DMrcvqcJK-YQMjf151SkAJkCNM', '2022-11-23 15:17:42', '2022-11-23 15:17:42'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE2NjkyNzAxOTMsImV4cCI6MTcwMDgyNzc5M30.o68UP4ye6s3Qd2aVLujbV5yp5BBQUeHyimXmnX2g4v4', '2022-11-24 11:39:53', '2022-11-24 11:39:53'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwiaWF0IjoxNjY5MjcwODc1LCJleHAiOjE3MDA4Mjg0NzV9.QP0PEJwYyI2lraC4jjgSHEoJxaxcbVWqFIZHM0ilrHg', '2022-11-24 11:51:15', '2022-11-24 11:51:15'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwiaWF0IjoxNjY5MjcxNDQ4LCJleHAiOjE3MDA4MjkwNDh9.eIN2yZYTQVEtJZrfDXdx4zkgbiHknjeSOh8609rIriw', '2022-11-24 12:00:48', '2022-11-24 12:00:48'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwiaWF0IjoxNjY5MjcxNTYxLCJleHAiOjE3MDA4MjkxNjF9.GhTZD5U159F8V_cV0EmMv7vr0B3QfguD-6gdcXEno3Q', '2022-11-24 12:02:41', '2022-11-24 12:02:41'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMSwiaWF0IjoxNjY5Mjc3NDc2LCJleHAiOjE3MDA4MzUwNzZ9._vi-UYTYFL6O1otyiTMoW1rdG4O2ZhZlYdQYhXJhFek', '2022-11-24 13:41:16', '2022-11-24 13:41:16'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NjkyODgyNzUsImV4cCI6MTcwMDg0NTg3NX0.0rwG1vLs7rIOXFRz-W6Y9qJCWpeKx56PByfj8lV4C_U', '2022-11-24 16:41:15', '2022-11-24 16:41:15'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NjkzNTIwNDQsImV4cCI6MTcwMDkwOTY0NH0.WlbMz6vNhnlpS2Bz-KlzlEdqd3lB66MEifBGql6DGF0', '2022-11-25 10:24:04', '2022-11-25 10:24:04'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwiaWF0IjoxNjY5NjE4Njg5LCJleHAiOjE3MDExNzYyODl9.K4niIurefotDIb4wujbMu1cuczmAOSKMP9wDozpowdM', '2022-11-28 12:28:09', '2022-11-28 12:28:09'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNjY5NjkzNTgzLCJleHAiOjE3MDEyNTExODN9.7rJ6HacvZ2iCevmpoHdj-hsrc7eW70lhxgum6Ox2GJM', '2022-11-29 09:16:23', '2022-11-29 09:16:23'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njk3MDEzMDksImV4cCI6MTcwMTI1ODkwOX0.W7q5yNLOiN2Op_WPPtKLjW-HmRqJWb0v8pNxU99-zdg', '2022-11-29 11:25:09', '2022-11-29 11:25:09'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOCwiaWF0IjoxNjY5NzkxMDA3LCJleHAiOjE3MDEzNDg2MDd9.WDm8AlsF0BQpPGXL5zh1SoFcVUqLunWiVqOw2X3CmXA', '2022-11-30 06:50:07', '2022-11-30 06:50:07'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njk3OTE1ODgsImV4cCI6MTcwMTM0OTE4OH0.VMqNJ_4ogXPDzysfpgm_0tcCHhJFRA0IM7SZjCxAedE', '2022-11-30 06:59:48', '2022-11-30 06:59:48'),
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOSwiaWF0IjoxNjY5NzkyNDg4LCJleHAiOjE3MDEzNTAwODh9.L2ccFNtKb7GotkACDZqHZqAXfQ-k4zF7u6NpGIV1dY0', '2022-11-30 07:14:48', '2022-11-30 07:14:48'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOSwiaWF0IjoxNjY5NzkyNTA1LCJleHAiOjE3MDEzNTAxMDV9.JoZB_RnlFRMpAcEso59AxrH_xeNol76ZfkDvl6_wdlw', '2022-11-30 07:15:05', '2022-11-30 07:15:05'),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOSwiaWF0IjoxNjY5ODAwODkyLCJleHAiOjE3MDEzNTg0OTJ9.w53myv2YOufMO5as-8RwohQXvWWQ6tIU7vAhDQliW2A', '2022-11-30 09:34:52', '2022-11-30 09:34:52'),
(25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njk4MDkzMTgsImV4cCI6MTcwMTM2NjkxOH0.kQ2rXmCyeSelU6MFWsZbQGvTLeo3kRfsMoLwV33znWc', '2022-11-30 11:55:18', '2022-11-30 11:55:18'),
(26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njk4MDkzNTUsImV4cCI6MTcwMTM2Njk1NX0.aO-aOBCZPveiZmfZzakRaUxY_4BMftAwrBet2P-zS54', '2022-11-30 11:55:55', '2022-11-30 11:55:55'),
(27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njk4MTA5OTUsImV4cCI6MTcwMTM2ODU5NX0.IivJoDUiXIlztWoKSyP-uoXgH3vXT2kylDHWTkPC8Ug', '2022-11-30 12:23:15', '2022-11-30 12:23:15'),
(28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njk4MTEwNTgsImV4cCI6MTcwMTM2ODY1OH0.occBdltkZ5ejI22EHhtNbUXyUAsidA--4d6bn9rnP_o', '2022-11-30 12:24:18', '2022-11-30 12:24:18'),
(29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njk4MTEyOTgsImV4cCI6MTcwMTM2ODg5OH0.m6e-DQHFoGfDvn18fUSZK_XQIxzxNKRw6_soh5tAl84', '2022-11-30 12:28:18', '2022-11-30 12:28:18'),
(30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMCwiaWF0IjoxNjY5ODI2MTgxLCJleHAiOjE3MDEzODM3ODF9.P7LYd20fl-N0-A7ZznbHLiMj5wIublD2JWPSE6fCx1M', '2022-11-30 16:36:21', '2022-11-30 16:36:21'),
(31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMCwiaWF0IjoxNjY5ODI2MjIzLCJleHAiOjE3MDEzODM4MjN9.jFLFcW3tkpFX3NlDzTJ3XAE6lsmapHqIx4Hh0pqDt80', '2022-11-30 16:37:03', '2022-11-30 16:37:03'),
(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMCwiaWF0IjoxNjY5ODI4MjkyLCJleHAiOjE3MDEzODU4OTJ9.4roG4AczqIU7KYDSociVL1ZiHdCus915mbApvFhWOU0', '2022-11-30 17:11:32', '2022-11-30 17:11:32'),
(33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiaWF0IjoxNjY5ODI4Njg4LCJleHAiOjE3MDEzODYyODh9.hX9vUs1S2wNEka_laQtSOyI_p62cZM69RKp-SeAUILU', '2022-11-30 17:18:08', '2022-11-30 17:18:08'),
(34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiaWF0IjoxNjY5ODI4NzIwLCJleHAiOjE3MDEzODYzMjB9.s-QmUyCAlvooK1vTu__06Ltv-Ny8VlP2_f0ozwySQQA', '2022-11-30 17:18:40', '2022-11-30 17:18:40'),
(35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwiaWF0IjoxNjY5ODM2NDEwLCJleHAiOjE3MDEzOTQwMTB9.Z_q7RYuxGbO8w_NBkX02KpPgwnf4HBqlyUxgruU6g3Y', '2022-11-30 19:26:50', '2022-11-30 19:26:50'),
(36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwiaWF0IjoxNjY5ODM2NDIyLCJleHAiOjE3MDEzOTQwMjJ9.QeKi1j-LVYQO9PZbP2el9EyBUv6xM9cZpZHemtNThS4', '2022-11-30 19:27:02', '2022-11-30 19:27:02'),
(37, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiaWF0IjoxNjY5ODQwNzA4LCJleHAiOjE3MDEzOTgzMDh9.LyufoULRthPoCR2FGPimzbgT20nNX69yUGPy9O-UiW4', '2022-11-30 20:38:28', '2022-11-30 20:38:28'),
(38, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiaWF0IjoxNjY5ODQxNTM4LCJleHAiOjE3MDEzOTkxMzh9.PPvE7cjsat6RyvWzSTbqJ7-fJvfn27oVf2Oxjmh8Vhs', '2022-11-30 20:52:18', '2022-11-30 20:52:18');

-- --------------------------------------------------------

--
-- Table structure for table `rental_income_mast`
--

CREATE TABLE `rental_income_mast` (
  `ri_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `year` int(10) NOT NULL,
  `building_value` varchar(50) DEFAULT NULL,
  `land_value` varchar(50) DEFAULT NULL,
  `property_address` text DEFAULT NULL,
  `number_of_days_rented` varchar(50) DEFAULT NULL,
  `property_purchased_date` date DEFAULT NULL,
  `property_holder` varchar(50) DEFAULT NULL,
  `income` varchar(50) DEFAULT NULL,
  `rents_received` varchar(50) DEFAULT NULL,
  `royalties_received` varchar(50) DEFAULT NULL,
  `expenses` varchar(50) DEFAULT NULL,
  `mortgage_interest` varchar(50) DEFAULT NULL,
  `other_interest` varchar(50) DEFAULT NULL,
  `insurance` varchar(50) DEFAULT NULL,
  `repairs` varchar(50) DEFAULT NULL,
  `auto_travel` varchar(50) DEFAULT NULL,
  `advertising` varchar(50) DEFAULT NULL,
  `taxes` varchar(50) DEFAULT NULL,
  `legal_professional_fees` varchar(50) DEFAULT NULL,
  `cleaning_maintenance` varchar(50) DEFAULT NULL,
  `commissions` varchar(50) DEFAULT NULL,
  `utilities` varchar(50) DEFAULT NULL,
  `management_fees` varchar(50) DEFAULT NULL,
  `supplies` varchar(50) DEFAULT NULL,
  `other_expenses` varchar(50) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rental_income_mast`
--

INSERT INTO `rental_income_mast` (`ri_id`, `user_id`, `year`, `building_value`, `land_value`, `property_address`, `number_of_days_rented`, `property_purchased_date`, `property_holder`, `income`, `rents_received`, `royalties_received`, `expenses`, `mortgage_interest`, `other_interest`, `insurance`, `repairs`, `auto_travel`, `advertising`, `taxes`, `legal_professional_fees`, `cleaning_maintenance`, `commissions`, `utilities`, `management_fees`, `supplies`, `other_expenses`, `updated_at`, `created_at`) VALUES
(1, 2, 2022, '50', '500', 'ABC Address', '5', '2022-11-29', 'name is Xyz', '9000', '500', '200', '300', '20', '50', '500', '400', '800', '20', '5000', '5600', '890', '450', '210', '50', '30', '500', '2022-11-29 15:27:28', '2022-11-29 14:19:58');

-- --------------------------------------------------------

--
-- Table structure for table `spouse_identity_mast`
--

CREATE TABLE `spouse_identity_mast` (
  `spouse_id` int(10) NOT NULL,
  `user_id` int(20) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `mname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `visa_type_id` int(10) DEFAULT NULL,
  `first_entry_date` date DEFAULT NULL,
  `occupation` text DEFAULT NULL,
  `irs_status_id` int(10) DEFAULT NULL,
  `ssn_itin` text DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `spouse_identity_mast`
--

INSERT INTO `spouse_identity_mast` (`spouse_id`, `user_id`, `fname`, `mname`, `lname`, `dob`, `visa_type_id`, `first_entry_date`, `occupation`, `irs_status_id`, `ssn_itin`, `updated_at`, `created_at`) VALUES
(1, 2, 'First', 'Middle', 'Last', '1995-02-25', 1, '2022-11-19', 'Diamond Business', 1, '22146545', '2022-11-26 13:11:14', '2022-11-19 11:37:53'),
(2, 18, 'First', 'Middle', 'Last', '1995-02-25', 1, '2022-11-19', 'Diamond Business', 1, '22146545', '2022-11-30 06:53:16', '2022-11-30 06:53:16');

-- --------------------------------------------------------

--
-- Table structure for table `spouse_residential_address_mast`
--

CREATE TABLE `spouse_residential_address_mast` (
  `sra_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `year` varchar(20) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `spouse_residential_address_mast`
--

INSERT INTO `spouse_residential_address_mast` (`sra_id`, `user_id`, `year`, `data`, `updated_at`, `created_at`) VALUES
(1, 2, '2022', '[{\"state_of_residence\":\"Gujarat1\",\"from_date\":\"2022-01-11\",\"to_date\":\"2022-05-11\"},{\"state_of_residence\":\"Maharastra1\",\"from_date\":\"2022-05-12\",\"to_date\":\"2022-12-30\"}]', '2022-11-26 13:11:14', '2022-11-26 12:59:54'),
(2, 18, '2022', '[{\"state_of_residence\":\"Gujarat1\",\"from_date\":\"2022-01-11\",\"to_date\":\"2022-05-11\"},{\"state_of_residence\":\"Maharastra1\",\"from_date\":\"2022-05-12\",\"to_date\":\"2022-12-30\"}]', '2022-11-30 06:53:16', '2022-11-30 06:53:16');

-- --------------------------------------------------------

--
-- Table structure for table `users_mast`
--

CREATE TABLE `users_mast` (
  `user_id` int(11) NOT NULL,
  `filing_id` varchar(20) DEFAULT NULL,
  `login_from` varchar(100) NOT NULL,
  `social_auth_id` text DEFAULT NULL,
  `fullname` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT 'NULL',
  `year_of_tax_filing` int(10) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `alternate_phone` varchar(15) DEFAULT NULL,
  `do_you_know` int(10) DEFAULT NULL,
  `advertisements` text DEFAULT NULL,
  `others` text DEFAULT NULL,
  `preferred_timezone` varchar(50) DEFAULT NULL,
  `filing_status_id` int(20) DEFAULT NULL,
  `occupation` text DEFAULT NULL,
  `ssn` varchar(200) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `anniversary_date` date DEFAULT NULL,
  `visa_type_id` int(11) DEFAULT NULL,
  `first_entry_date` date DEFAULT NULL,
  `indian_phone` varchar(15) DEFAULT NULL,
  `mailing_address` text DEFAULT NULL,
  `appartment` text DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `is_more_employer` tinyint(1) NOT NULL DEFAULT 0,
  `employer_info` text DEFAULT NULL,
  `wallet_balance` float(10,2) NOT NULL DEFAULT 0.00 COMMENT 'In Dollar $',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_mast`
--

INSERT INTO `users_mast` (`user_id`, `filing_id`, `login_from`, `social_auth_id`, `fullname`, `email`, `password`, `year_of_tax_filing`, `phone`, `alternate_phone`, `do_you_know`, `advertisements`, `others`, `preferred_timezone`, `filing_status_id`, `occupation`, `ssn`, `dob`, `anniversary_date`, `visa_type_id`, `first_entry_date`, `indian_phone`, `mailing_address`, `appartment`, `city`, `state`, `zip`, `is_more_employer`, `employer_info`, `wallet_balance`, `status`, `updated_at`, `created_at`) VALUES
(1, '100001', 'google', 'EOIR2423DDUFHRD', 'Dharmesh Setblue', 'setblue.dharmesh@gmail.com', 'NULL', NULL, NULL, NULL, 3, NULL, 'Dummy Text', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 80.00, 1, '0000-00-00 00:00:00', '2022-11-15 16:59:53'),
(2, '100002', 'manually', NULL, 'Dharmesh M Setblue', 'setblue.dharmesh1@gmail.com', '$2b$12$XEzvflRj5It4pbPTXJouOOxSPEFJaUQsVkrScNp4RzD2OU1wEwECG', 2022, '+918889996668', '+918889996666', 3, NULL, 'Dummy Text', 'CST', 2, '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 0, '', 80.00, 1, '0000-00-00 00:00:00', '2022-11-15 17:22:40'),
(3, '100003', 'manually', NULL, 'Dharmesh Setblue2', 'setblue.dharmesh2@gmail.com', '$2b$10$4H/NQ32czC/hx0zeUFdgh.cUIVCe6CSuwKnYqKJFERdP/pYt05Qd.', 2022, '+918889996664', '', 3, NULL, 'Dummy Text', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-19 12:44:53', '2022-11-19 12:44:53'),
(4, '100004', 'manually', NULL, 'Dharmesh Setblue2', 'setblue.dharmesh3@gmail.com', '$2b$10$6H5wg5BoHdB7YxEKn2d1/eotEoakmG9xX91a6hSOyaojVksOnkil.', 2022, '+918889996665', '', 3, NULL, 'Dummy Text', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-19 12:47:20', '2022-11-19 12:47:20'),
(5, '100005', 'manually', NULL, 'Dharmesh Setblue2', 'setblue.dharmesh4@gmail.com', '$2b$10$SrEf/ENANtViAjiqn1CPR.Twe.eYcKGwPb/WRMu4bl9vLi7IM497W', 2022, '+918889996667', '', 2, 'Advertisement Text', NULL, 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-21 13:44:02', '2022-11-21 13:44:02'),
(10, '1000010', 'manually', NULL, 'Dharmesh Setblue2', 'setblue.dharmesh5@gmail.com', '$2b$12$vKPeumkYM93O3yoMOayZJemEEhEceBjMso0RgKSDRoCbGuVN9lLoe', 2022, '+918889996669', '', 1, NULL, NULL, 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-24 11:51:15', '2022-11-24 11:51:15'),
(11, '1000011', 'manually', NULL, 'Dharmesh Setblue6', 'setblue.dharmesh6@gmail.com', '$2b$12$DiUqKpn2zqMX3sqHetk67OHOo4apTtcsPRGZvDRKbwXYCbiwYGdlq', 2022, '+918889996610', '', 1, '', '', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-24 13:41:16', '2022-11-24 13:41:16'),
(12, '1000012', 'manually', NULL, 'Dharmesh Setblue6', 'setblue.dharmesh7@gmail.com', '$2b$12$1liE7sUE5za/Ka3B1MjN1OrCY7YRtphLbORFilw6vy3WFTgbbZmvW', 2022, '+918889996611', '', 1, '', '', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-28 12:28:09', '2022-11-28 12:28:09'),
(13, '1000013', 'manually', NULL, 'Dharmesh Setblue8', 'setblue.dharmesh8@gmail.com', '$2b$12$AJ6J9iEhRlPYm95nG8TMteQrTvd0qba2NbWIpLC21LwPNnIzwaCu6', 2022, '+918889996628', '', 1, '', '', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-30 06:24:56', '2022-11-30 06:24:56'),
(14, '1000014', 'manually', NULL, 'Dharmesh Setblue9', 'setblue.dharmesh9@gmail.com', '$2b$12$Om7Mz2KqQWgE2sF3UeGd8.QiJ/7sV74vsW03Ww0Fd/PSl/JPq7kue', 2022, '+918889996629', '', 1, '', '', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-30 06:30:36', '2022-11-30 06:30:36'),
(15, '1000015', 'manually', NULL, 'Dharmesh Setblue10', 'setblue.dharmesh10@gmail.com', '$2b$12$1ATPUZMr/M.9JU7wwGSaPeEBqXNY2iepbmpJyofCilTq/bZOpGYoG', 2022, '+918889996620', '', 1, '', '', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-30 06:36:53', '2022-11-30 06:36:53'),
(16, '1000016', 'manually', NULL, 'Dharmesh Setblue11', 'setblue.dharmesh11@gmail.com', '$2b$12$lq1eYM2FQAoo1LBrUgSqvObL1cvz/./Mki9yZUqmZXMWiB7ctdahO', 2022, '+918889996621', '', 1, '', '', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-30 06:44:52', '2022-11-30 06:44:52'),
(17, '1000017', 'manually', NULL, 'Dharmesh Setblue12', 'setblue.dharmesh12@gmail.com', '$2b$12$gTBrBokatWmjT5zv9EP4qOTBsfgBTGr5IQYPZMQ2fupWuGMbdXheK', 2022, '+918889996622', '', 1, '', '', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-30 06:46:29', '2022-11-30 06:46:29'),
(18, '1000018', 'manually', NULL, 'Dharmesh M Setblue', 'setblue.dharmesh13@gmail.com', '$2b$12$q2w1888gdzoWIQbFhsqA9.L/loKUSbgNsSAMu0/B/AUEMp0ck4w6O', 2022, '+918889996623', '', 2, 'Test Info', '', 'CST', 2, '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 0, '', 0.00, 1, '2022-11-30 06:53:16', '2022-11-30 06:50:07'),
(19, '1000019', 'manually', NULL, 'subham', 'kumarsubham3356@gmail.com', '$2b$12$AfHOFmxp4/RXV3APBMh70.TRCX6IbKB1.GvGdVDhUolN/S6BMrHGe', 2022, '7991171019', '7867464738', 2, 'Internet', '', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-30 07:14:48', '2022-11-30 07:14:48'),
(20, '1000020', 'manually', NULL, 'Golla Raju', 'ambitiousandomnipotent@gmail.com', '$2b$12$p1tHFgaKH9lyBRpikBnwTOZin0Se.cgU26GBoD/A8zTGk8JXln4Zq', 2022, '1234567890', '', 2, 'Internet', '', 'EST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-30 16:36:21', '2022-11-30 16:36:21'),
(21, '1000021', 'manually', NULL, 'Praveen Gajula', 'praveendears@gmail.com', '$2b$12$9qolB94OnVHHhgIdQQLb/.iAd3OjN0BjQc1AovmMbeae8X5CfNfhG', 2022, '8121664886', '9440498100', 3, '', 'fdsf', 'CST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0.00, 1, '2022-11-30 17:18:08', '2022-11-30 17:18:08'),
(22, '1000022', 'manually', NULL, 'Chandu Paka Chandrakanth', 'Chandu.chan@gmail.com', '$2b$12$TwjLbNKkAmKlxvXbo0rKXelf/X4F5QVnoDNpkPYLkSFAcmSZq1kee', 2021, '9989998115', '', 3, '', 'fb', 'EST', 2, 'Software engineer', '121-32-1212', '1993-07-04', '1993-07-04', 1, '2016-07-04', '', 'Ashburn 1132132', '', 'Ashburn', 'Virginia', '20147', 0, '', 0.00, 1, '2022-11-30 19:38:34', '2022-11-30 19:26:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_residential_address_mast`
--

CREATE TABLE `user_residential_address_mast` (
  `ura_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `year` varchar(20) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_residential_address_mast`
--

INSERT INTO `user_residential_address_mast` (`ura_id`, `user_id`, `year`, `data`, `updated_at`, `created_at`) VALUES
(1, 2, '2021', '[{\"state_of_residence\":\"Gujarat\",\"from_date\":\"2022-01-11\",\"to_date\":\"2022-05-11\"},{\"state_of_residence\":\"Maharastra\",\"from_date\":\"2022-05-12\",\"to_date\":\"2022-12-30\"}]', '2022-11-26 13:11:14', '2022-11-19 10:31:50'),
(2, 2, '2022', '[{\"state_of_residence\":\"Gujarat\",\"from_date\":\"2022-01-11\",\"to_date\":\"2022-05-11\"},{\"state_of_residence\":\"Maharastra\",\"from_date\":\"2022-05-12\",\"to_date\":\"2022-12-30\"}]', '2022-11-26 12:54:10', '2022-11-19 10:31:50'),
(10, 18, '2021', '[{\"state_of_residence\":\"Gujarat\",\"from_date\":\"2022-01-11\",\"to_date\":\"2022-05-11\"},{\"state_of_residence\":\"Maharastra\",\"from_date\":\"2022-05-12\",\"to_date\":\"2022-12-30\"}]', '2022-11-30 06:53:16', '2022-11-30 06:53:16'),
(11, 22, '2022', '[{\"year\":2022,\"state_of_residence\":\"Virginia\",\"from_date\":\"2022-01-20\",\"to_date\":\"2019-07-20\"}]', '2022-11-30 19:38:34', '2022-11-30 19:31:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bankinfo_mast`
--
ALTER TABLE `bankinfo_mast`
  ADD PRIMARY KEY (`info_id`);

--
-- Indexes for table `dependent_mast`
--
ALTER TABLE `dependent_mast`
  ADD PRIMARY KEY (`dependent_id`);

--
-- Indexes for table `dependent_residential_address_mast`
--
ALTER TABLE `dependent_residential_address_mast`
  ADD PRIMARY KEY (`dra_id`);

--
-- Indexes for table `documents_mast`
--
ALTER TABLE `documents_mast`
  ADD PRIMARY KEY (`document_id`);

--
-- Indexes for table `employee_mast`
--
ALTER TABLE `employee_mast`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `expenses_mast`
--
ALTER TABLE `expenses_mast`
  ADD PRIMARY KEY (`exp_id`);

--
-- Indexes for table `fbar_mast`
--
ALTER TABLE `fbar_mast`
  ADD PRIMARY KEY (`fbar_id`);

--
-- Indexes for table `messages_mast`
--
ALTER TABLE `messages_mast`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `other_income_mast`
--
ALTER TABLE `other_income_mast`
  ADD PRIMARY KEY (`oi_id`);

--
-- Indexes for table `referral_mast`
--
ALTER TABLE `referral_mast`
  ADD PRIMARY KEY (`referral_id`);

--
-- Indexes for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rental_income_mast`
--
ALTER TABLE `rental_income_mast`
  ADD PRIMARY KEY (`ri_id`);

--
-- Indexes for table `spouse_identity_mast`
--
ALTER TABLE `spouse_identity_mast`
  ADD PRIMARY KEY (`spouse_id`);

--
-- Indexes for table `spouse_residential_address_mast`
--
ALTER TABLE `spouse_residential_address_mast`
  ADD PRIMARY KEY (`sra_id`);

--
-- Indexes for table `users_mast`
--
ALTER TABLE `users_mast`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_residential_address_mast`
--
ALTER TABLE `user_residential_address_mast`
  ADD PRIMARY KEY (`ura_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bankinfo_mast`
--
ALTER TABLE `bankinfo_mast`
  MODIFY `info_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dependent_mast`
--
ALTER TABLE `dependent_mast`
  MODIFY `dependent_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dependent_residential_address_mast`
--
ALTER TABLE `dependent_residential_address_mast`
  MODIFY `dra_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `documents_mast`
--
ALTER TABLE `documents_mast`
  MODIFY `document_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_mast`
--
ALTER TABLE `employee_mast`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `expenses_mast`
--
ALTER TABLE `expenses_mast`
  MODIFY `exp_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fbar_mast`
--
ALTER TABLE `fbar_mast`
  MODIFY `fbar_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages_mast`
--
ALTER TABLE `messages_mast`
  MODIFY `message_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `other_income_mast`
--
ALTER TABLE `other_income_mast`
  MODIFY `oi_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `referral_mast`
--
ALTER TABLE `referral_mast`
  MODIFY `referral_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `rental_income_mast`
--
ALTER TABLE `rental_income_mast`
  MODIFY `ri_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `spouse_identity_mast`
--
ALTER TABLE `spouse_identity_mast`
  MODIFY `spouse_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `spouse_residential_address_mast`
--
ALTER TABLE `spouse_residential_address_mast`
  MODIFY `sra_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_mast`
--
ALTER TABLE `users_mast`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_residential_address_mast`
--
ALTER TABLE `user_residential_address_mast`
  MODIFY `ura_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
