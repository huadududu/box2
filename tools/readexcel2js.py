#--coding=utf-8--
#author:xubing zhang

# 从第N行开始获取内容，可以对需要的列进行关键字映射，生成lua或者json文件/js文件

import  os,sys
import xlrd
import  codecs
import time, datetime
import plistlib
import string
import sys
import zipfile
import shutil
import json
import codecs

reload(sys)
sys.setdefaultencoding('utf-8')


# keyindex 作为 key
def generageLua(rowsContent,rowMap,keyindex):

    rowTotalStr = ""
    for row in rowsContent:
        if len(row) < len(rowMap):
            print "your template is wrong"
            return False
        # print row,keyindex,rowMap,startcolomnindex,endIndex
        # print "row",row,keyindex
        cotentStr = dealOneRow(row,rowMap,keyindex)
        if rowTotalStr != "":
            rowTotalStr = rowTotalStr + ","
        rowTotalStr =  rowTotalStr + cotentStr +"\n"
    totalstr = "return {%s}"%(rowTotalStr)
    # print totalstr
    return totalstr

#生成 { ['xxx'] = {x=1,y=2,z=3}}
# keyindex 作为 key
def dealOneRow(oneRow,rowMap,keyindex):
    rowContent = ""
    print "dealOneRow",oneRow,len(oneRow)
    for i in range(0, len(oneRow)):
        value = oneRow[i]
        key = rowMap[i]
        if rowContent != "":
            rowContent = rowContent + ","
        content = """\n ["%s"]="%s" """ %(key,str(value))
        print "content:",content
        rowContent = rowContent +content    
    cotentStr = """ ["%s"] = {%s} """ % (oneRow[keyindex], rowContent)
    #mkdirs(oneRow[keyindex])
    #gitpush(oneRow[keyindex])
    return cotentStr

def readExcel(excelPath,sheetName,startrow = 0,rowendindex=100):
    rowscontent = []
    err = False
    if os.path.exists(excelPath):
        workbook = xlrd.open_workbook(excelPath)
        sheet_names = workbook.sheet_names()
        print "sheet_names:",sheet_names
        if sheetName in sheet_names:
            sheet = workbook.sheet_by_name(sheetName)
            print "find sheet",sheetName
            print "sheet nrows,",sheet.nrows,' number:', sheet.number
            if rowendindex ==0 :
                rowendindex  = sheet.nrows
            for i in range(sheet.nrows):
                if i >= startrow and i <= rowendindex:
                    rows = sheet.row_values(i)  # 获取第i行内容
                    rowscontent.append(rows)
                    print rows
        else:
            print "there is no sheet named:",sheetName
            err = True

    else:
        print "there is no file at: ",excelPath
        err = True
    return rowscontent,err

def saveFile(fullPath, str):
    outfile = codecs.open(fullPath, "w", "utf-8")
    outfile.write(str)
    outfile.close()

def doit(excelPath,sheetName,luaFilePath,columnMap,rowstartindex,rowendindex):
    rowscontent, err = readExcel(excelPath,sheetName,rowstartindex,rowendindex)
    print "rowscontent",rowscontent
    if err:
        return
    else:
        pass
        # totalLua = generageLua(rowscontent,columnMap,0)
        # saveFile(luaFilePath, totalLua)

def mkdirs(packageName):
    cmd = "adb shell mkdir -p sdcard/"+packageName
    os.system(cmd)

def gitpush(packageName):
    plistPath = "/Users/bing/Slots3.3/src/config.plist"
    contents = plistlib.readPlist(plistPath)
    print "contents:",contents
    contents['package'] = packageName
    plistlib.writePlist(contents,plistPath)
    dir = "/Users/bing/Slots3.3"
    os.chdir(dir)
    cmd = "python push.py"
    os.system(cmd)


def converLineConfig(excelPath,savepath):
    # '1':{type: 1, b: ['0', '1D2', '0', '1D2', '0'], bar: [0, 0, 0, 0, 0], i: ['0', '0', '0', '0', '0']},

    ret = parseOneSheetLineConfig(excelPath,'block')
    convertoJs(ret,savepath)

def parseOneSheetLineConfig(excelPath,sheetName):

    rowstartindex = 1
    rowendindex = 0
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        group,lineindex,lineconfig =  parseLineConfig(item)
        if not config.get(group):
            config[group] =[]
        config[group].append(lineconfig)
    return config


def str2f(str):
    ret = str2str(str)
    if ret == "":
        return 0.0

    return float(ret)


def str2i(str):
    print "str2i",str,type(str)
    ret = str2str(str)
    if ret == "":
        return 0
    return int(float(ret))

# float unicode -》str。 if str == '0.0'，change to '0'
def str2str(strin):

    print 'str',strin,type(strin), strin == '0.0',type(strin) == float
    retstr =strin
    if type(strin) == float:
        retstr = str(strin)
    elif type(strin) == unicode:
        retstr = strin.encode("utf-8")

    if(retstr == '0.0'):
        return '0'
    else:
        return retstr

def parseLineConfig(content):

    index = 0
    lineindex = content[index].encode("utf-8")
    lineindexs = lineindex.split("#")

    #b0-b4
    index += 1
    g0 = str2i(content[index])
    index += 1
    g1 = str2i(content[index])
    index += 1
    g2 = str2i(content[index])
    index += 1
    g3 = str2i(content[index])
    index += 1
    g4 = str2i(content[index])
    g = [g0, g1, g2, g3, g4]

    return lineindexs[0],lineindexs[1],g
    # lineindex = content[0].splite('#')
    # print lineindex
    # for item in content:
    #     print item

def parseTankConfig(content):
    # '1':{id: 1, head: 't_1001.png', body: ['t_1002.png', 't_1002.png'], itemIcon: "i_10001.png", bulletsp: "",
    #      bulletspeed: 100, bulletF: 10, onepos: [4.5], twopos: [3, 6]}


    # type
    ret = {}
    ret['id'] = str2i(content[0])
    ret['head'] =  str2str(content[1])

    # body
    ret['body'] = []
    body1 = str2str(content[2])
    if body1:
        ret['body'].append(body1)

    body2 = str2str(content[3])
    if body2:
        ret['body'].append(body2)

    body3 = str2str(content[4])
    if body3:
        ret['body'].append(body3)

    # bullet

    ret['bulletsp'] = str2str(content[5])

    #bullet position
    ret['onepos'] = [str2i(content[6])]
    ret['twopos'] =[]

    twopos = str2str(content[7])
    twopos = twopos.split(';')
    ret['twopos'].append(float(twopos[0]))
    ret['twopos'].append(float(twopos[1]))


    ret['bulletspeed'] = str2i(content[8])

    ret['bulletF'] = str2f(content[9])

    ret['itemIcon'] = str2str(content[10])
    ret['wudi'] = str2str(content[11])
    ret['texiao'] = str2str(content[12])

    return str(ret['id']),ret

def parseItemConfig(content):
    # {
    #
    #     '10000': {name: '无敌', type: 1, icon: 'i_10000.png', time: 5},
    #     '10001': {name: '身体', type: 2, icon: '', time: 0},
    #     '10002': {name: '单排子弹', type: 3, icon: 'i_10002.png', time: 0},
    #     '10003': {name: '双排子弹', type: 4, icon: 'i_10003.png', time: 0},
    #     '10004': {name: '子弹频率双倍', type: 5, icon: 'i_10004.png', time: 0},
    #
    # };

    # excel 10000	无敌	1	i_10000.png	10	持续10秒
    # type
    ret = {}
    key = str2str(str2i(content[0]))
    ret['name'] = str2str(content[1])
    ret['type'] =  str2i(content[2])
    ret['icon'] = str2str(content[3])
    ret['time'] = str2f(content[4])

    return key,ret


def parseSpeedConfig(content):
    score = str2i(content[0])
    v = str2f(content[1])
    return score,v

def parseBlockConfig(content):

    ret = {}
    ret['id'] = str2i(content[0])
    ret['min'] = str2i(content[1])
    ret['max'] = str2i(content[2])
    ret['icon'] = str2str(content[3])
    ret['texiao'] = str2str(content[4])
    return ret

def parsePositionConfig(content):

    ret = {}
    key = str2str(content[0])
    ret['min'] = str2i(content[1])
    ret['max'] = str2i(content[2])
    return key,ret

#
#
#
#

def converTankConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'tank'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index,c = parseTankConfig(item)
        config[index] = c

    print 'config',config
    convertoJs(config, savepath)

def converItemConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'item'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        key,c = parseItemConfig(item)
        config[key] = c

    print 'config',config
    convertoJs(config, savepath)

def converSpeedConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'speed'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)
    config = {}
    config['score'] =[]
    config['speed'] = []
    for item in rowscontent:
        score,v = parseSpeedConfig(item)
        config['score'].append(score)
        config['speed'].append(v)

    print 'config',config
    convertoJs(config, savepath)


def converBlockConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'block'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)
    config = {}
    config['blocks'] =[]
    for item in rowscontent:
        c = parseBlockConfig(item)
        config['blocks'].append(c)

    print 'config',config
    convertoJs(config, savepath)


def converPositionConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'position'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)
    config = {}
    for item in rowscontent:
        k,c = parsePositionConfig(item)
        config[k] = c
    print 'config',config
    convertoJs(config, savepath)

def convertoJs(content,savefile='test.js'):
    json_string = json.dumps(content)
    print json_string

    SlotConfigContent = """\n//xubing \n//这个文件是根据脚本自动生成，修改无效。\nmodule.exports = %s;""" % (json_string)

    SlotConfigContentFile = codecs.open(savefile, "w", "utf-8")
    SlotConfigContentFile.write(SlotConfigContent)
    SlotConfigContentFile.close()
    print "\033[6;30;46m", " genereate  finished %s " % (savefile), "\033[0m"



def converTank():

    # print str2i("")
    # return

    excelPath = "/Users/bing/works/minigame/game/doc/tile/gameconfig-tile.xlsx"

    # line config
    savepath = "/Users/bing/works/minigame/game/block/block/assets/src/model/LineConfig.js"
    converLineConfig(excelPath,savepath)


    # item config
    # savepath = "/Users/bing/works/minigame/game/tank/tank/assets/src/model/ItemConfig.js"
    # converItemConfig(excelPath, savepath)

    # speed config
    savepath = "/Users/bing/works/minigame/game/block/block/assets/src/model/SpeedConfig.js"
    converSpeedConfig(excelPath, savepath)


if __name__ == "__main__":

    # gitpush("BING.BING.BING")

    # mkdirs("test")

    converTank()


    # excelPath = "/Users/bing/Desktop/excel/w1.xlsx"
    # sheetName = "adcolony"
    # luaRowMap = ['appname', 'package','APPID', 'AdZoneID', 'VideoZoneID'] # AdZoneID-》ad     VideoZoneID-》video
    # keyindex = 1
    # luaFilePath = "/Users/bing/Slots3.3/src/AdcolonyConfig.lua"
    # dotest(excelPath, sheetName, luaRowMap, keyindex,luaFilePath,1,len(luaRowMap))
