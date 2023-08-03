cmake_minimum_required(VERSION 3.1.0)

project(tickball VERSION 0.0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)


include_directories(
    "/usr/local/Cellar/sdl2/2.28.1/include"
)

file( GLOB SOURCES
    "main.cpp"
    "src/.h"
    "src/*.cpp"
)

set(
    SDL2_LIB
    "/usr/local/Cellar/sdl2/2.28.1/lib/libSDL2-2.0.0.dylib"
)

add_executable(
    tickball ${SOURCES}
)

target_link_libraries(tickball ${SDL2_LIB} )