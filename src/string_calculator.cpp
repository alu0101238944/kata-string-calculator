
#include "../include/string_calculator.h"

StringCalculator::StringCalculator(void) {
  delimiters_ = {",", "\n"};
}

StringCalculator::~StringCalculator() {}

std::string StringCalculator::setDelimiters(std::string expression) {
  if (expression[0] == expression[1] && expression[1] == '/') {
    expression.erase(0, 2); // '//'
    if (expression[0] == '[') {
      delimiters_ = {};
      do {
        expression.erase(0, 1); // '['
        std::string delimiter = "";
        while (expression[0] != ']') {
          delimiter += expression[0];
          expression.erase(0, 1);
        }
        expression.erase(0, 1); // ']'
        delimiters_.push_back(delimiter);
      } while (expression[0] == '[');
    } else {
      delimiters_ = {std::string(1, expression[0])};
      expression.erase(0, 1); // delimiter
    }
    expression.erase(0, 1); // '\n'
  }
  return expression;
}

int StringCalculator::add(std::string expression) {
  expression = setDelimiters(expression);
  std::vector<std::string> splittedExpression = splitByDelimiters(expression);

  int result = 0;
  std::vector<int> negatives = {};
  for (int i = 0; i < splittedExpression.size(); i++) {
    int integer = std::stoi(splittedExpression[i]);
    if (integer < 0) {
      negatives.push_back(integer);
    }
    if (integer <= 1000) {
      result += integer;
    }
  }

  if (negatives.size() > 0) {
    std::string error = "Negatives are not allowed: ";
    for (int i = 0; i < negatives.size(); i++) {
      error += std::to_string(negatives[i]);
      if (i < negatives.size() - 1) {
        error += ", ";
      }
    }
    throw error;
  }

  return result;
}

std::vector<std::string> StringCalculator::splitByDelimiters(std::string expression) {
  std::string accumulator = "";
  std::vector<std::string> splitted = {};
  size_t i = 0;
  while (i < expression.size()) {
    bool foundDelimiter = false;
    for (size_t j = 0; j < delimiters_.size(); j++) {
      std::string currentDelimiter = "";
      std::vector<std::string> delimiters = delimiters_;
      for (size_t k = 0; k < delimiters_[j].size(); k++) {
        if (expression[i + k] != delimiters_[j][k]) {
          break;
        }
        currentDelimiter = delimiters_[j];
      }
      if (currentDelimiter != "") {
        foundDelimiter = true;
        splitted.push_back(accumulator);
        i += currentDelimiter.size();
        accumulator = "";
        break;
      }
    }
    if (!foundDelimiter) {
      accumulator += expression[i];
      i++;
    }
  }
  if (accumulator != "") {
    splitted.push_back(accumulator);
  }
  return splitted;
}
