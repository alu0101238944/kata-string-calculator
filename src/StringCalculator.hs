module StringCalculator where

import Data.List.Split (splitOneOf)

sumNumbersInExpression :: String -> Int
sumNumbersInExpression "" = 0
sumNumbersInExpression s = sum . map read $ (splitOneOf "\n,") s
