cmake_minimum_required(VERSION 3.1.0)

project(tickball VERSION 0.0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)

include_directories(

)

find_package(SDL2 REQUIRED COMPONENTS SDL2)

file( GLOB SOURCES
    main.cpp
    src/.h
    src/*.cpp
)

add_executable(
    tickball ${SOURCES}
)

target_link_libraries(tickball PRIVATE SDL2::SDL2)