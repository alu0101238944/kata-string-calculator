module Main where

import StringCalculator
import Test.Hspec

main :: IO ()
main = hspec stringCalculatorTests

{- https://osherove.com/tdd-kata-1 -}

stringCalculatorTests :: Spec
stringCalculatorTests = describe "StringCalculator behaviour" $ do
  it "An empty expression should evaluate to zero" $ do
    sumNumbersInExpression "" `shouldBe` 0

  it "An expression with only a number should evaluate to that number" $ do
    sumNumbersInExpression "1" `shouldBe` 1
    sumNumbersInExpression "4" `shouldBe` 4

  it "An expression of numbers separated with commas should evaluate to the sum of those numbers" $ do
    sumNumbersInExpression "1,2" `shouldBe` 3
    sumNumbersInExpression "10,20,30" `shouldBe` 60

  it "An expression of numbers separated with commas or newlines should evaluate to the sum of those numbers" $ do
    sumNumbersInExpression "1,2\n3" `shouldBe` 6

  it "Should be posible define custom delimiters" $ do
    sumNumbersInExpression "//;\n1;2" `shouldBe` 3
