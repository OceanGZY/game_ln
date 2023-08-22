cmake_minimum_required(VERSION 3.1)

project(snake)


file(GLOB SRC_FILES main.cpp)


set(THIRD_DIR "/Users/gaozhiyong/Documents/GitHub/game_ln/cpp_sfml/3rds")

if(CMAkE_SYSTEM_NAME STREQUAL "Windows")
    set(SFML_DIR ${THIRD_DIR}/sfml2.6.0_win)
elseif(CMAKE_SYSTEM_NAME STREQUAL "Darwin")
    set(SFML_DIR ${THIRD_DIR}/sfml2.6.0_mac)
endif()


find_package(SFML 2.6 COMPONENTS audio network graphics window system REQUIRED)

if(NOT SFML_FOUND)
    message(FATAL_ERROR "SFML NOT FOUND!")
else()
    message("SFML FOUND!")
endif()


add_executable(snake ${SRC_FILES})

target_link_libraries(snake sfml-audio sfml-network sfml-graphics sfml-window sfml-system)

