CREATE DATABASE greenfield

USE greenfield;

CREATE TABLE `greenfield`.`plantas` (
  `idplanta` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  `imagen` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idplanta`));

CREATE TABLE `greenfield`.`eventos` (
  `ideventos` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(500) NULL,
  PRIMARY KEY (`ideventos`));

CREATE TABLE `greenfield`.`eventosplantas` (
  `ideventosplantas` INT NOT NULL AUTO_INCREMENT,
  `plantaid` INT NULL,
  `eventoid` INT NULL,
  `fecha` DATE NULL,
  PRIMARY KEY (`ideventosplantas`),
  INDEX `plantaid_idx` (`plantaid` ASC) VISIBLE,
  INDEX `eventoid_idx` (`eventoid` ASC) VISIBLE,
  CONSTRAINT `plantaid`
    FOREIGN KEY (`plantaid`)
    REFERENCES `greenfield`.`plantas` (`idplanta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE, 
  CONSTRAINT `eventoid`
    FOREIGN KEY (`eventoid`)
    REFERENCES `greenfield`.`eventos` (`ideventos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);