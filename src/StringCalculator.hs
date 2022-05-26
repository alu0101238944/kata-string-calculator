module StringCalculator where

import Data.List.Split (splitOn, splitOneOf)
import Data.Bifunctor (first)

sumNumbersInExpression :: String -> Either Int [Int]
sumNumbersInExpression "" = Left 0
sumNumbersInExpression ('/' : '/' : delimiter : '\n' : rest) = sumNumbersInExpressionWithDelimiters [delimiter] rest
sumNumbersInExpression expression = sumNumbersInExpressionWithDelimiters "\n," expression

sumNumbersInExpressionWithDelimiters :: [Char] -> String -> Either Int [Int]
sumNumbersInExpressionWithDelimiters delimiters = first sum . checkNegatives . parseNumbersSeparatedByDelimiters delimiters

checkNegatives :: [Int] -> Either [Int] [Int]
checkNegatives numbers
  | null negatives = Left numbers
  | otherwise = Right negatives
  where negatives = filter (< 0) numbers

parseNumbersSeparatedByDelimiters :: [Char] -> String -> [Int]
parseNumbersSeparatedByDelimiters delimiters = map read . splitOneOf delimiters
