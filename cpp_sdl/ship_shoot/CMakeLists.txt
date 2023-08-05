cmake_minimum_required(VERSION 3.10.0)
project(ship_shoot)

set(CMAKE_CXX_STANDARD 11)

file(
    GLOB source
    "main.cpp"
    "src/*.cpp"
    "Assets/*.png"
    "Assets/*.txt"
    "Assets/*.csv"
)

set (SDL2_H "/usr/local/Cellar/sdl2/2.28.1/include")
set (SDL2_LIB "/usr/local/Cellar/sdl2/2.28.1/lib/libSDL2-2.0.0.dylib")

set (SDL2_IMAGE_H "/usr/local/Cellar/sdl2_image/2.6.3_1/include")
set (SDL2_IMAGE_LIB "/usr/local/Cellar/sdl2_image/2.6.3_1/lib/libSDL2_image-2.0.0.dylib")

include_directories(
    "include"
    ${SDL2_H}
    ${SDL2_IMAGE_H}
)

add_executable(
    ship_shoot ${source}
)

target_link_libraries(ship_shoot ${SDL2_LIB} ${SDL2_IMAGE_LIB})