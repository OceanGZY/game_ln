cmake_minimum_required(VERSION 3.10.0)
project(demo02)

file(
    GLOB source
    "main.cpp"
    "src/*.cpp"
    "assets/*.png"
    "assets/*.txt"
    "assets/*.csv"
)

include_directories(
    "include"
)

find_package(SDL2 REQUIRED COMPONENTS SDL2)

add_executable(
    demo02 ${source}
)

target_link_libraries(demo02 PRIVATE SDL2::SDL2)