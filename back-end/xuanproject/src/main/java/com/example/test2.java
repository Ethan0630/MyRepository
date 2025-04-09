package com.example;

import java.util.Scanner;

public class test2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        arr(num);
        sc.close();
    }

    public static void arr(int n) {
        int num = 1;
        for (int i = 1; i <= n; i++) {
            int sum = 0;

            for (int j = 1; j <= i; j++) {
                System.out.print(num);
                sum += num;
                if (j == i) {
                    System.out.print(" = " + sum);
                } else {
                    System.out.print(" + ");
                }
            }
            num *= 2;
            System.out.println();
        }
    }
}
