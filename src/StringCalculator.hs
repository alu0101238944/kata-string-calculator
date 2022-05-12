module StringCalculator where

sumNumbersInExpression :: String -> Int
sumNumbersInExpression s
  | length s == 0 = 0 
  | otherwise = read s
