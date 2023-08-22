cmake_minimum_required(VERSION 3.10.0)

project(dudujump VERSION 0.1.0 LANGUAGES CXX) 

file(
    GLOB SRC_LIST
    "main.cpp"
    "images/*.png"
)


# 设置第三方库
set(THIRD_DIR "/Users/gaozhiyong/Documents/GitHub/game_ln/cpp_sfml/3rds")

# 设置sfml的库
if(CMAkE_SYSTEM_NAME STREQUAL "Darwin")
    SET(SFML_DIR ${3rds}/sfml2.6.0_mac)
elseif(CMAkE_SYSTEM_NAME STREQUAL "Windows")
    SET(SFML_DIR ${3rds}/sfml2.6.0_win)
endif()

find_package(SFML 2.6 COMPONENTS audio network graphics window system REQUIRED)

if (NOT SFML_FOUND)
    message(FATAL_ERROR "SFML NOT FOUND!")
else()
    message("SFML FOUND!")
endif()

add_executable(dudujump ${SRC_LIST})

target_link_libraries(dudujump sfml-audio sfml-network sfml-graphics sfml-window sfml-system)
