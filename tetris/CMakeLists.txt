cmake_minimum_required(VERSION 3.1.0)
project(sqtetis)


# sources 
file(GLOB SRC_LIST 
        "main.cpp"
        # "source/*.cpp"
        "assets/*.png"
        "assets/*.wav"
        "assets/*.ttf"
        )

# 3rd part filedir
set (THIRDPART_DIR 3rds)

if(CMAkE_SYSTEM_NAME STREQUAL "Darwin")
    SET(SFML_DIR ${THIRDPART_DIR}/mac/sfml2.6.0)
elseif(CMAkE_SYSTEM_NAME STREQUAL "Windows")
    SET(SFML_DIR ${THIRDPART_DIR}/win/sfml2.6.0)
endif()


find_package(SFML 2.6 COMPONENTS audio network graphics window system REQUIRED)

if (NOT SFML_FOUND)
    message(FATAL_ERROR "SFML NOT FOUND!")
else()
    message("SFML FOUND!")
endif()

# include directory
include_directories(
    include
)


add_executable(sqtetris ${SRC_LIST})

target_link_libraries(sqtetris sfml-audio sfml-network sfml-graphics sfml-window sfml-system)