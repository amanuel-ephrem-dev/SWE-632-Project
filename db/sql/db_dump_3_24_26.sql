-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: meta_tier
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item_rankings`
--

DROP TABLE IF EXISTS `item_rankings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_rankings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tier_list_id` int NOT NULL,
  `item_id` int NOT NULL,
  `tier` enum('S','A','B','C','D','F') NOT NULL,
  `position` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_item_rankings_tier_list_id_idx` (`tier_list_id`),
  KEY `fk_item_rankings_item_id_idx` (`item_id`),
  CONSTRAINT `fk_item_rankings_item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_rankings_tier_list_id` FOREIGN KEY (`tier_list_id`) REFERENCES `tier_lists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_rankings`
--

LOCK TABLES `item_rankings` WRITE;
/*!40000 ALTER TABLE `item_rankings` DISABLE KEYS */;
INSERT INTO `item_rankings` VALUES (6,2,16,'A',1),(7,2,17,'C',1),(8,2,18,'S',1),(9,2,19,'A',2),(10,2,20,'B',1),(11,3,16,'A',1),(12,3,17,'C',1),(13,3,18,'S',1),(14,3,19,'A',2),(15,3,20,'B',1),(16,6,11,'S',0),(17,6,14,'S',1),(18,6,13,'A',0),(19,6,12,'A',1),(20,6,15,'B',0),(21,7,11,'S',0),(22,7,14,'S',1),(23,7,12,'A',0),(24,7,13,'B',0),(25,7,15,'C',0),(26,8,11,'S',0),(27,8,12,'S',1),(28,8,13,'A',0),(29,8,15,'A',1),(30,8,14,'B',0),(31,9,11,'S',0),(32,9,12,'S',1),(33,9,13,'A',0),(34,9,15,'A',1),(35,9,14,'B',0),(36,10,11,'S',0),(37,10,12,'S',1),(38,10,13,'A',0),(39,10,15,'A',1),(40,10,14,'B',0),(41,11,11,'S',0),(42,11,12,'S',1),(43,11,13,'A',0),(44,11,15,'A',1),(45,11,14,'B',0),(46,12,11,'S',0),(47,12,12,'S',1),(48,12,13,'A',0),(49,12,15,'A',1),(50,12,14,'B',0),(51,13,11,'S',0),(52,13,12,'S',1),(53,13,13,'A',0),(54,13,15,'A',1),(55,13,14,'B',0),(56,14,11,'S',0),(57,14,12,'S',1),(58,14,13,'A',0),(59,14,15,'A',1),(60,14,14,'B',0),(61,15,11,'S',0),(62,15,12,'S',1),(63,15,13,'A',0),(64,15,14,'A',1),(65,15,15,'B',0),(66,16,11,'S',0),(67,16,12,'S',1),(68,16,13,'A',0),(69,16,14,'A',1),(70,16,15,'B',0),(71,19,16,'A',1),(72,19,17,'C',1),(73,19,18,'F',1),(74,19,19,'A',2),(75,19,20,'B',1),(76,20,16,'A',1),(77,20,17,'C',1),(78,20,18,'F',1),(79,20,19,'A',2),(80,20,20,'B',1),(81,21,18,'S',0),(82,21,19,'S',1),(83,21,16,'A',0),(84,21,20,'A',1),(85,21,17,'C',0),(86,22,23,'S',0),(87,22,25,'A',0),(88,22,21,'A',1),(89,22,24,'B',0),(90,22,22,'C',0),(91,23,11,'S',0),(92,23,12,'A',0),(93,23,14,'B',0),(94,23,13,'C',0),(95,23,15,'D',0),(96,24,26,'S',0),(97,24,27,'S',1),(98,24,29,'A',0),(99,24,30,'A',1),(100,24,28,'B',0),(101,25,33,'S',0),(102,25,31,'S',1),(103,25,32,'A',0),(104,25,34,'B',0),(105,25,35,'C',0);
/*!40000 ALTER TABLE `item_rankings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` text,
  `template_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_items_template_id_idx` (`template_id`),
  CONSTRAINT `fk_items_template_id` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (11,'golden retriever',NULL,1),(12,'chihuahua',NULL,1),(13,'dachshund',NULL,1),(14,'beagle',NULL,1),(15,'dalmatian',NULL,1),(16,'pineapple',NULL,2),(17,'guava',NULL,2),(18,'banana',NULL,2),(19,'passionfruit',NULL,2),(20,'coconut',NULL,2),(21,'AC/DC',NULL,3),(22,'queen',NULL,3),(23,'metallica',NULL,3),(24,'led zeppelin',NULL,3),(25,'linkin park',NULL,3),(26,'christmas',NULL,12),(27,'halloween',NULL,12),(28,'easter',NULL,12),(29,'thanksgiving',NULL,12),(30,'independence day',NULL,12),(31,'cookies',NULL,4),(32,'ice cream',NULL,4),(33,'brownies',NULL,4),(34,'pie',NULL,4),(35,'cake',NULL,4);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,'Cutest Dog Breeds','A collection of loveable dog breeds.','Animals'),(2,'Tastiest Tropical Fruits','A collection of common tropical fruits.','Food'),(3,'Best Rock Bands','The top classic and metal rock bands.','Music'),(4,'Yummiest Desserts','A collection of the most popular desserts.','Food'),(12,'Favorite Holidays','The most popular holidays in the US.',NULL);
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tier_lists`
--

DROP TABLE IF EXISTS `tier_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tier_lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `template_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_rankings_user_id_idx` (`user_id`),
  KEY `fk_rankings_template_id_idx` (`template_id`),
  CONSTRAINT `fk_rankings_template_id` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rankings_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tier_lists`
--

LOCK TABLES `tier_lists` WRITE;
/*!40000 ALTER TABLE `tier_lists` DISABLE KEYS */;
INSERT INTO `tier_lists` VALUES (2,1,2,'2026-02-01 05:06:21'),(3,1,2,'2026-02-02 04:59:47'),(6,2,1,'2026-02-02 05:18:18'),(7,2,1,'2026-02-02 05:23:43'),(8,2,1,'2026-02-02 05:24:52'),(9,2,1,'2026-02-02 05:29:27'),(10,2,1,'2026-02-02 05:29:31'),(11,2,1,'2026-02-02 05:29:31'),(12,2,1,'2026-02-02 05:29:31'),(13,2,1,'2026-02-02 05:30:04'),(14,2,1,'2026-02-02 05:31:36'),(15,2,1,'2026-02-02 05:31:54'),(16,2,1,'2026-02-02 05:33:34'),(19,1,2,'2026-02-02 07:35:47'),(20,3,2,'2026-02-02 07:36:12'),(21,1,2,'2026-02-03 06:29:09'),(22,1,3,'2026-02-03 06:37:50'),(23,1,1,'2026-03-20 03:36:41'),(24,1,12,'2026-03-20 03:59:34'),(25,1,4,'2026-03-20 04:05:19');
/*!40000 ALTER TABLE `tier_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Carlos',NULL,'2026-01-31 21:50:07'),(2,'Kaan',NULL,'2026-01-31 21:50:27'),(3,'Angelina',NULL,'2026-01-31 21:50:27'),(4,'Amanuel',NULL,'2026-01-31 21:50:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-24 13:16:28
