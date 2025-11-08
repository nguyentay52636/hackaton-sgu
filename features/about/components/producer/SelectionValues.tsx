"use client"

import { Card, CardContent } from '@/shared/ui/card'
import { motion } from 'framer-motion'
import { values } from './data'
export default function SelectionValues() {

    return (
        <>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Giá trị của chúng tôi</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => {
                                const Icon = value.icon
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                                <p className="text-muted-foreground">{value.description}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
