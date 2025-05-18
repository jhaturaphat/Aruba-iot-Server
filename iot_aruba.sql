/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.100.1_root
 Source Server Type    : MariaDB
 Source Server Version : 100511 (10.5.11-MariaDB-1-log)
 Source Host           : 192.168.100.1:3306
 Source Schema         : iot_aruba

 Target Server Type    : MariaDB
 Target Server Version : 100511 (10.5.11-MariaDB-1-log)
 File Encoding         : 65001

 Date: 18/05/2025 21:22:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for device_inventory
-- ----------------------------
DROP TABLE IF EXISTS `device_inventory`;
CREATE TABLE `device_inventory`  (
  `d_no` int(11) NOT NULL AUTO_INCREMENT,
  `d_name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `d_macaddress` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`d_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sensors
-- ----------------------------
DROP TABLE IF EXISTS `sensors`;
CREATE TABLE `sensors`  (
  `s_no` int(11) NOT NULL AUTO_INCREMENT,
  `s_mac_address` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `s_device_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `s_minor` int(11) NULL DEFAULT NULL,
  `s_major` int(11) NULL DEFAULT NULL,
  `s_battery` int(11) NULL DEFAULT NULL,
  `s_dynamic_value` int(11) NULL DEFAULT NULL,
  `s_rssi` int(11) NOT NULL,
  `s_timestamp` datetime NOT NULL,
  `s_location` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`s_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4073 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
