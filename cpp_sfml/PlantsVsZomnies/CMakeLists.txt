cmake_minimum_required(VERSION 3.16)
project(plantsVSzombies)

set(CMAKE_CXX_STANDARD 11)

set(CMAK_CXX_FLAGS "${CMAK_CXX_FLAGS} -g")

set(EXECUTABLE_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/bin)

include_directories(${PROJECT_SOURCE_DIR}/include)

# 复制文件夹
execute_process( COMMAND ${CMAKE_COMMAND} -E copy_directory ${PROJECT_SOURCE_DIR}/resources ${EXECUTABLE_OUTPUT_PATH}/resources)


find_package(SFML 2.6 COMPONENTS audio  graphics window system REQUIRED)

aux_source_directory(./src SRC_LIST)

add_executable(plantsVSzombies main.cc ${SRC_LIST})

target_link_libraries(plantsVSzombies sfml-audio sfml-graphics sfml-window sfml-system)