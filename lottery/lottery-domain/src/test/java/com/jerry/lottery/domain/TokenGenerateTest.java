/**
 * 
 */
package com.jerry.lottery.domain;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

import com.jerry.lottery.domain.util.TokenGenerate;

/**
 *
 * @author jinjun@f-road.com.cn
 * @date 2014年2月8日 下午1:11:05
 * 
 */
public class TokenGenerateTest  {

	@Test
	public void testGenerate(){
		try{
			TokenGenerate.generate(32);
			assertTrue(true);
		}catch(Exception e){
			fail(e.getMessage());
		}
	}

}
