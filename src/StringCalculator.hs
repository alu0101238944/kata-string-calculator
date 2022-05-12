module StringCalculator where

import Data.List.Split (splitOn)

sumNumbersInExpression :: String -> Int
sumNumbersInExpression "" = 0
sumNumbersInExpression s = sum . map read $ (splitOn ",") s
