
cmake_minimum_required(VERSION 3.14)
project(string_calculator)

set(CMAKE_CXX_STANDARD 17)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/609281088cfefc76f9d0ce82e1ff6c30cc3591e5.zip
)
# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

enable_testing()

add_library(
  string_calculator
  src/string_calculator.cpp
  include/string_calculator.h
)

add_executable(
  string_calculator_test
  test/string_calculator_test.cpp
  include/string_calculator.h
)

target_link_libraries(
  string_calculator_test
  string_calculator
  gtest_main
)

include(GoogleTest)
gtest_discover_tests(string_calculator_test)
