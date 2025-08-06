-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- مضيف: localhost
-- وقت الجيل: 07 أغسطس 2025 الساعة 03:15
-- إصدار الخادم: 10.11.10-MariaDB-log
-- نسخة PHP: 8.3.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- قاعدة بيانات: `nagl`
--

-- --------------------------------------------------------

--
-- بنية الجدول `CardSequence`
--

CREATE TABLE `CardSequence` (
  `Prefix` varchar(10) NOT NULL,
  `LastDriverCardNumber` int(11) DEFAULT 47115,
  `LastOperationCardNumber` int(11) DEFAULT 14220
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `City`
--

CREATE TABLE `City` (
  `CityID` int(11) NOT NULL,
  `NameAr` varchar(100) NOT NULL,
  `NameEn` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `OPC_Card`
--

CREATE TABLE `OPC_Card` (
  `ID` int(11) NOT NULL,
  `token` varchar(50) DEFAULT NULL,
  `CardNumber` varchar(30) DEFAULT NULL,
  `CardType` varchar(100) DEFAULT NULL,
  `FacilityID` int(11) DEFAULT NULL,
  `VehicleID` int(11) DEFAULT NULL,
  `DriverID` int(11) DEFAULT NULL,
  `IssueDate` varchar(30) DEFAULT NULL,
  `ExpirationDate` varchar(30) DEFAULT NULL,
  `RenewalDate` varchar(30) DEFAULT NULL,
  `Supplier` int(11) DEFAULT NULL,
  `addingDate` date DEFAULT NULL,
  `LastUpdate` date DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `status` enum('نشطة','منتهية','معلقة','ملغاة') DEFAULT 'نشطة'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- القوادح `OPC_Card`
--
DELIMITER $$
CREATE TRIGGER `before_insert_operation_card` BEFORE INSERT ON `OPC_Card` FOR EACH ROW BEGIN
  DECLARE license_number VARCHAR(30);
  SELECT LicenseNumber INTO license_number
  FROM OPC_Facility
  WHERE FacilityID = NEW.FacilityID
  LIMIT 1;
  SET NEW.CardNumber = generate_card_number('operation', license_number);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- بنية الجدول `OPC_Driver`
--

CREATE TABLE `OPC_Driver` (
  `DriverID` int(11) NOT NULL,
  `FacilityID` int(11) DEFAULT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `IdentityNumber` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `OPC_DriverCard`
--

CREATE TABLE `OPC_DriverCard` (
  `ID` int(11) NOT NULL,
  `token` varchar(50) DEFAULT NULL,
  `CardNumber` varchar(30) DEFAULT NULL,
  `CardType` int(11) DEFAULT NULL,
  `Category` varchar(50) DEFAULT NULL,
  `FacilityID` int(11) DEFAULT NULL,
  `DriverID` int(11) DEFAULT NULL,
  `IssueDate` varchar(30) DEFAULT NULL,
  `ExpirationDate` varchar(30) DEFAULT NULL,
  `RenewalDate` varchar(30) DEFAULT NULL,
  `Supplier` int(11) DEFAULT NULL,
  `addingDate` date DEFAULT NULL,
  `LastUpdate` date DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `status` enum('نشطة','منتهية','معلقة','ملغاة') DEFAULT 'نشطة'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- القوادح `OPC_DriverCard`
--
DELIMITER $$
CREATE TRIGGER `before_insert_driver_card` BEFORE INSERT ON `OPC_DriverCard` FOR EACH ROW BEGIN
  DECLARE license_number VARCHAR(30);
  SELECT LicenseNumber INTO license_number
  FROM OPC_Facility
  WHERE FacilityID = NEW.FacilityID
  LIMIT 1;
  SET NEW.CardNumber = generate_card_number('driver', license_number);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `prevent_duplicate_active_driver_card` BEFORE INSERT ON `OPC_DriverCard` FOR EACH ROW BEGIN
  DECLARE existing_count INT;

  SELECT COUNT(*) INTO existing_count
  FROM OPC_DriverCard
  WHERE DriverID = NEW.DriverID
    AND status = 'نشطة';

  IF existing_count > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = '⚠️ لا يمكن إصدار بطاقة جديدة: السائق يملك بطاقة فعالة مسبقًا';
  END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- بنية الجدول `OPC_Facility`
--

CREATE TABLE `OPC_Facility` (
  `FacilityID` int(11) NOT NULL,
  `IdentityNumber` varchar(50) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `EnglishName` varchar(100) DEFAULT NULL,
  `LicenseNumber` varchar(30) DEFAULT NULL,
  `LicenseTypeID` int(11) DEFAULT NULL,
  `LicenseCityID` int(11) DEFAULT NULL,
  `LicenseIssueDate` varchar(30) DEFAULT NULL,
  `LicenseExpirationDate` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `OPC_LicenseType`
--

CREATE TABLE `OPC_LicenseType` (
  `LicenseTypeID` int(11) NOT NULL,
  `LicenseTypeNameAR` varchar(255) NOT NULL,
  `LicenseTypeNameEN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `OPC_Vehicle`
--

CREATE TABLE `OPC_Vehicle` (
  `ID` int(11) NOT NULL,
  `FacilityID` int(11) DEFAULT NULL,
  `Brand` varchar(50) DEFAULT NULL,
  `Model` varchar(50) DEFAULT NULL,
  `Color` varchar(30) DEFAULT NULL,
  `PlateNumber` varchar(50) DEFAULT NULL,
  `SerialNumber` varchar(30) DEFAULT NULL,
  `ManufacturingYear` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `Supplier`
--

CREATE TABLE `Supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `Users`
--

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `FullName` varchar(150) NOT NULL,
  `Email` varchar(150) DEFAULT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `Role` enum('مدير','موظف','مراقب') NOT NULL DEFAULT 'موظف',
  `Status` enum('نشط','موقوف') DEFAULT 'نشط',
  `LastLogin` datetime DEFAULT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- فهارس للجدول `CardSequence`
--
ALTER TABLE `CardSequence`
  ADD PRIMARY KEY (`Prefix`);

--
-- فهارس للجدول `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`CityID`);

--
-- فهارس للجدول `OPC_Card`
--
ALTER TABLE `OPC_Card`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FacilityID` (`FacilityID`),
  ADD KEY `VehicleID` (`VehicleID`),
  ADD KEY `DriverID` (`DriverID`),
  ADD KEY `Supplier` (`Supplier`);

--
-- فهارس للجدول `OPC_Driver`
--
ALTER TABLE `OPC_Driver`
  ADD PRIMARY KEY (`DriverID`),
  ADD KEY `FacilityID` (`FacilityID`);

--
-- فهارس للجدول `OPC_DriverCard`
--
ALTER TABLE `OPC_DriverCard`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CardType` (`CardType`),
  ADD KEY `FacilityID` (`FacilityID`),
  ADD KEY `DriverID` (`DriverID`),
  ADD KEY `Supplier` (`Supplier`);

--
-- فهارس للجدول `OPC_Facility`
--
ALTER TABLE `OPC_Facility`
  ADD PRIMARY KEY (`FacilityID`),
  ADD KEY `LicenseTypeID` (`LicenseTypeID`),
  ADD KEY `LicenseCityID` (`LicenseCityID`);

--
-- فهارس للجدول `OPC_LicenseType`
--
ALTER TABLE `OPC_LicenseType`
  ADD PRIMARY KEY (`LicenseTypeID`);

--
-- فهارس للجدول `OPC_Vehicle`
--
ALTER TABLE `OPC_Vehicle`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FacilityID` (`FacilityID`);

--
-- فهارس للجدول `Supplier`
--
ALTER TABLE `Supplier`
  ADD PRIMARY KEY (`id`);

--
-- فهارس للجدول `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `City`
--
ALTER TABLE `City`
  MODIFY `CityID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OPC_Card`
--
ALTER TABLE `OPC_Card`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OPC_Driver`
--
ALTER TABLE `OPC_Driver`
  MODIFY `DriverID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OPC_DriverCard`
--
ALTER TABLE `OPC_DriverCard`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OPC_Facility`
--
ALTER TABLE `OPC_Facility`
  MODIFY `FacilityID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OPC_LicenseType`
--
ALTER TABLE `OPC_LicenseType`
  MODIFY `LicenseTypeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OPC_Vehicle`
--
ALTER TABLE `OPC_Vehicle`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Supplier`
--
ALTER TABLE `Supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- القيود المفروضة على الجداول الملقاة
--

--
-- قيود الجداول `OPC_Card`
--
ALTER TABLE `OPC_Card`
  ADD CONSTRAINT `OPC_Card_ibfk_1` FOREIGN KEY (`FacilityID`) REFERENCES `OPC_Facility` (`FacilityID`),
  ADD CONSTRAINT `OPC_Card_ibfk_2` FOREIGN KEY (`VehicleID`) REFERENCES `OPC_Vehicle` (`ID`),
  ADD CONSTRAINT `OPC_Card_ibfk_3` FOREIGN KEY (`DriverID`) REFERENCES `OPC_Driver` (`DriverID`),
  ADD CONSTRAINT `OPC_Card_ibfk_4` FOREIGN KEY (`Supplier`) REFERENCES `Supplier` (`id`);

--
-- قيود الجداول `OPC_Driver`
--
ALTER TABLE `OPC_Driver`
  ADD CONSTRAINT `OPC_Driver_ibfk_1` FOREIGN KEY (`FacilityID`) REFERENCES `OPC_Facility` (`FacilityID`);

--
-- قيود الجداول `OPC_DriverCard`
--
ALTER TABLE `OPC_DriverCard`
  ADD CONSTRAINT `OPC_DriverCard_ibfk_1` FOREIGN KEY (`CardType`) REFERENCES `OPC_LicenseType` (`LicenseTypeID`),
  ADD CONSTRAINT `OPC_DriverCard_ibfk_2` FOREIGN KEY (`FacilityID`) REFERENCES `OPC_Facility` (`FacilityID`),
  ADD CONSTRAINT `OPC_DriverCard_ibfk_3` FOREIGN KEY (`DriverID`) REFERENCES `OPC_Driver` (`DriverID`),
  ADD CONSTRAINT `OPC_DriverCard_ibfk_4` FOREIGN KEY (`Supplier`) REFERENCES `Supplier` (`id`);

--
-- قيود الجداول `OPC_Facility`
--
ALTER TABLE `OPC_Facility`
  ADD CONSTRAINT `OPC_Facility_ibfk_1` FOREIGN KEY (`LicenseTypeID`) REFERENCES `OPC_LicenseType` (`LicenseTypeID`),
  ADD CONSTRAINT `OPC_Facility_ibfk_2` FOREIGN KEY (`LicenseCityID`) REFERENCES `City` (`CityID`);

--
-- قيود الجداول `OPC_Vehicle`
--
ALTER TABLE `OPC_Vehicle`
  ADD CONSTRAINT `OPC_Vehicle_ibfk_1` FOREIGN KEY (`FacilityID`) REFERENCES `OPC_Facility` (`FacilityID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
