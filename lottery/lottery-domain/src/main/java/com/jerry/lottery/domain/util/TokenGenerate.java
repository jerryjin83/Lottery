/**
 * 
 */
package com.jerry.lottery.domain.util;

/**
 *
 * @author jinjun@f-road.com.cn
 * @date 2014年2月8日 上午10:48:59
 * 
 */
public class TokenGenerate {
	static String charaters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	private static char randomChar(){
		while(true){
			int pos = new Double(Math.random()*100).intValue();
			if(pos<charaters.length()){
				return charaters.charAt(pos);
			}
		}
	} 
	
	public static String generate(int length){
		StringBuffer result = new StringBuffer("");
		for(int i=0;i<length;i++){
			result.append(randomChar());
		}
		return result.toString();
	}
}
