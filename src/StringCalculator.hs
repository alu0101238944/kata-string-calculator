module StringCalculator where

import Data.List.Split (splitOn, splitOneOf)

sumNumbersInExpression :: String -> Int
sumNumbersInExpression "" = 0
sumNumbersInExpression ('/' : '/' : delimiter : '\n' : rest) = sumNumbersSeparatedByDelimiters [delimiter] rest
sumNumbersInExpression expression = sumNumbersSeparatedByDelimiters "\n," expression

sumNumbersSeparatedByDelimiters ::  [Char] -> String -> Int
sumNumbersSeparatedByDelimiters delimiters = sum . map read . splitOneOf delimiters
