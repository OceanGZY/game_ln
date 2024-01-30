/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 11:40:13
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 14:46:04
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZLogger.cc
 * @Description: 注释信息
 */
#include "PVZLogger.h"
#include <time.h>

PVZLogger::PVZLogger() : loglevel(Info)
{
}

PVZLogger::~PVZLogger()
{
}

void PVZLogger::set_log_level(LogLevel level)
{
    loglevel = level;
}

void PVZLogger::log(std::string msg)
{
    time_t now = time(nullptr);
    tm *now_tm = localtime(&now);
    char time_buf[128];
    snprintf(time_buf, 128, "[%s]=>%d-%d-%d %d:%d:%d",
             loglevel == Info ? "INFO" : "ERROR",
             now_tm->tm_year + 1900,
             now_tm->tm_mon + 1,
             now_tm->tm_mday,
             now_tm->tm_hour,
             now_tm->tm_min,
             now_tm->tm_sec);
    msg.insert(0, time_buf);
    msg.append("\n");
    std::cout << msg;
}
PVZLogger &PVZLogger::get_instance()
{
    static PVZLogger logger;
    return logger;
}
