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
