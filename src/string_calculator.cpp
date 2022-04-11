
#include "../include/string_calculator.h"

StringCalculator::StringCalculator(void) {
  delimiters_ = {",", "\n"};
}

StringCalculator::~StringCalculator() {}

std::string StringCalculator::setDelimiters(std::string expression) {
  if (expression[0] == expression[1] && expression[1] == '/') {
    delimiters_ = {std::string(1, expression[2])};
    expression.erase(0, 4);
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
    result += integer;
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
      std::cout << i << ",'" << accumulator << "'; ";
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
      std::cout << "\n" << accumulator << "\n";
      i++;
    }
  }
  if (accumulator != "") {
    splitted.push_back(accumulator);
  }
  return splitted;
}
