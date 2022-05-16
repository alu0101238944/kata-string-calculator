module StringCalculator where

import Data.List.Split (splitOn, splitOneOf)

sumNumbersInExpression :: String -> Int
sumNumbersInExpression "" = 0
sumNumbersInExpression ('/' : '/' : delimiter : '\n' : s) = sum $ map read $ (splitOn [delimiter]) s
sumNumbersInExpression s = sum $ map read $ (splitOneOf "\n,") s
