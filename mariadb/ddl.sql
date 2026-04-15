-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        12.3.1-MariaDB - MariaDB Server
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  12.13.0.7147
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- edu 데이터베이스 구조 내보내기
USE `edu`;

-- 테이블 edu.ai_agent 구조 내보내기
CREATE TABLE IF NOT EXISTS edu.`ai_agent` (
	`no` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(30) ,
	`title` VARCHAR(255) ,
	`content` VARCHAR(255),
	`regdate` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`moddate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 edu.ai_agent:~9 rows (대략적) 내보내기
INSERT INTO `ai_agent` (`name`, `title`, `content`) VALUES
	('김지환', '좋은날', '하하 기분이 좋구나~'), 
	( '하하', '그래?', '기분이 좋아요~'),
	('하하', '그래?', '기분이 좋아요~'),
	( '하하', '그래?', '기분이 좋아요~'),
	('하하', '아하아하', '에이 그런가?'),
	('하하', '그래?', '기분이 좋아요~'),
	( '김지환', '김지환', '김지환'),
	( '김지환', '김지환', '김지환'),
	('김지환', '좋은날', '하하 기분이 좋구나~'),
	( '하하', '그래?', '기분이 좋아요~'),
	('하하', '그래?', '기분이 좋아요~'),
	( '하하', '그래?', '기분이 좋아요~'),
	('하하', '아하아하', '에이 그런가?'),
	('하하', '그래?', '기분이 좋아요~'),
	( '김지환', '김지환', '김지환'),
	( '김지환', '김지환', '김지환'),
	('김지환', '좋은날', '하하 기분이 좋구나~'),
	( '하하', '그래?', '기분이 좋아요~'),
	('하하', '그래?', '기분이 좋아요~'),
	( '하하', '그래?', '기분이 좋아요~'),
	('하하', '아하아하', '에이 그런가?'),
	('하하', '그래?', '기분이 좋아요~'),
	( '김지환', '김지환', '김지환'),
	( '김지환', '김지환', '김지환'),
	('김지환', '좋은날', '하하 기분이 좋구나~'),
	( '하하', '그래?', '기분이 좋아요~'),
	('하하', '그래?', '기분이 좋아요~'),
	( '하하', '그래?', '기분이 좋아요~'),
	('하하', '아하아하', '에이 그런가?'),
	('하하', '그래?', '기분이 좋아요~'),
	( '김지환', '김지환', '김지환'),
	( '김지환', '김지환', '김지환'),
	( '하이', '김', '지환의 글 작성');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
