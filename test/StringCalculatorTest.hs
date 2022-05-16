module Main where

import StringCalculator
import Test.Hspec

main :: IO ()
main = hspec stringCalculatorTests

{- https://osherove.com/tdd-kata-1 -}

stringCalculatorTests :: Spec
stringCalculatorTests = describe "StringCalculator behaviour" $ do
  it "An empty expression should evaluate to zero" $ do
    sumNumbersInExpression "" `shouldBe` Left 0

  it "An expression with only a number should evaluate to that number" $ do
    sumNumbersInExpression "1" `shouldBe` Left 1
    sumNumbersInExpression "4" `shouldBe` Left 4

  it "An expression of numbers separated with commas should evaluate to the sum of those numbers" $ do
    sumNumbersInExpression "1,2" `shouldBe` Left 3
    sumNumbersInExpression "10,20,30" `shouldBe` Left 60

  it "An expression of numbers separated with commas or newlines should evaluate to the sum of those numbers" $ do
    sumNumbersInExpression "1,2\n3" `shouldBe` Left 6

  it "Should be posible define custom delimiters" $ do
    sumNumbersInExpression "//;\n1;2" `shouldBe` Left 3

  it "Should not allow negative numbers" $ do
    sumNumbersInExpression "//;\n-1;2;-3" `shouldBe` Right [-1, -3]
