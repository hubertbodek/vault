import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TabsControllerProps {
  defaultValue: string
  tabs: Array<{
    value: string
    label: React.ReactNode
    content: React.ReactNode
  }>
}

export const TabsController = ({ defaultValue, tabs }: TabsControllerProps) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <div className="flex items-center">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={`trigger--${tab.value}`} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={`content--${tab.value}`} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
