-- Questions Table
CREATE TABLE IF NOT EXISTS `Question` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `question` TEXT NOT NULL,  -- Use TEXT or VARCHAR for questions
  `frequency` BIGINT,
  `answer_id` BIGINT  -- Foreign key to the Answers table
);

CREATE INDEX index_1 ON `Question` (`frequency`);

-- Answers Table (if multiple questions can have the same answer)
CREATE TABLE IF NOT EXISTS `Answer` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `answer_text` LONGTEXT NOT NULL
);

-- key_word Table
CREATE TABLE IF NOT EXISTS `key_word` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `palabra` VARCHAR(255) NOT NULL  -- Use VARCHAR or TEXT for keywords
);

-- keywordsXquestions Join Table
CREATE TABLE IF NOT EXISTS `keywordsXquestions` (
  `question_id` BIGINT NOT NULL,
  `keyword_id` BIGINT NOT NULL,
  PRIMARY KEY (`question_id`, `keyword_id`),  -- Composite primary key
  FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`keyword_id`) REFERENCES `key_word`(`id`) ON DELETE CASCADE
);

-- Foreign Key for Answer
ALTER TABLE `Question` ADD CONSTRAINT `fk_answer_id` FOREIGN KEY (`answer_id`) REFERENCES `Answer`(`id`) ON DELETE SET NULL;
